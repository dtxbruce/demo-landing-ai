import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, X, Globe } from "lucide-react";
import { toast } from "sonner";
import { useT, useLang } from "@/lib/i18n";

const AGENT_ID = "agent_6801kmeppancea2sswf8akf38amk";

const LANGUAGES = [
  { code: "it", label: "🇮🇹 Italiano" },
  { code: "en", label: "🇬🇧 English" },
  { code: "pl", label: "🇵🇱 Polski" },
];

interface ChatMessage {
  role: "user" | "agent";
  text: string;
}

function ElevenLabsAgentInner({ managerName, codiceAgente }: { managerName: string; codiceAgente: string }) {
  const t = useT();
  const currentLang = useLang();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLang);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync language with page language
  useEffect(() => {
    setSelectedLanguage(currentLang);
  }, [currentLang]);

  const conversation = useConversation({
    textOnly: true,
    onConnect: () => {
      setIsConnected(true);
      setIsConnecting(false);
    },
    onDisconnect: () => {
      setIsConnected(false);
      setIsConnecting(false);
    },
    onMessage: (message: any) => {
      const agentText =
        (message?.role === "agent" && typeof message?.message === "string" && message.message) ||
        (message?.type === "agent_response" && message?.agent_response_event?.agent_response) ||
        "";

      if (agentText) {
        setMessages((prev) => [...prev, { role: "agent", text: agentText }]);
      }
    },
    onError: (error) => {
      console.error("ElevenLabs error:", error);
      setIsConnecting(false);
      toast.error("Errore di connessione con l'assistente.");
    },
  });

  useEffect(() => {
    if (!isConnected) return;

    try {
      conversation.sendContextualUpdate(
        `L'identificativo dell'agente è: ${managerName}. Quando ti presenti usa questo identificativo. Rispondi in lingua ${selectedLanguage}.`
      );
    } catch (error) {
      console.warn("Failed to send contextual update:", error);
    }
  }, [conversation, isConnected, managerName, selectedLanguage]);

  const connect = useCallback(async () => {
    const resolvedIdentificativo = managerName.trim();
    const resolvedCodiceAgente = String(codiceAgente ?? "").trim();

    setIsConnecting(true);
    try {
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "websocket",
        dynamicVariables: {
          identificativo: resolvedIdentificativo,
          codiceagente: resolvedCodiceAgente,
        },
        overrides: {
          agent: {
            language: selectedLanguage as any,
          },
        },
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      toast.error("Impossibile connettersi all'assistente.");
      setIsConnecting(false);
    }
  }, [codiceAgente, conversation, managerName, selectedLanguage]);

  const disconnect = useCallback(async () => {
    await conversation.endSession();
    setMessages([]);
  }, [conversation]);

  const sendMessage = useCallback(() => {
    const text = inputText.trim();
    if (!text || !isConnected) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    conversation.sendUserMessage(text);
    setInputText("");
  }, [inputText, isConnected, conversation]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-xl border border-border overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sunflower/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-sunflower-dark" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-semibold text-sm">{t("chat.assistant")} {managerName}</p>
            <p className="text-muted-foreground text-xs">
              {isConnected ? t("chat.online") : t("chat.offline")}
            </p>
          </div>
          {/* Language selector */}
          <div ref={langMenuRef} className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
              title={t("chat.lang")}
            >
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{LANGUAGES.find(l => l.code === selectedLanguage)?.label.split(" ")[0]}</span>
            </button>
            {showLanguageMenu && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-50 py-1 w-44 max-h-[200px] overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code as typeof selectedLanguage);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors ${
                      selectedLanguage === lang.code ? "bg-sunflower/10 font-medium" : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {isConnected && (
            <button
              onClick={disconnect}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title={t("chat.end")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="bg-muted/30 rounded-xl p-4 mb-4 h-[260px] overflow-y-auto space-y-3">
          {!isConnected && messages.length === 0 && (
            <div className="flex items-center justify-center h-[180px]">
              <p className="text-muted-foreground text-sm text-center">
                {t("chat.startPrompt")}
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-xl px-3.5 py-2.5 max-w-[85%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-sunflower/20 text-foreground rounded-br-none"
                    : "bg-background border border-border text-foreground rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} aria-hidden />
        </div>

        {/* Input or Connect */}
        {isConnected ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-muted/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm border border-border outline-none focus:ring-1 focus:ring-sunflower/50"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="bg-sunflower hover:bg-sunflower-dark text-foreground rounded-xl p-3 transition-colors disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={disconnect}
              className="w-full py-2 px-4 rounded-xl text-sm font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              {t("chat.end")}
            </button>
          </div>
        ) : (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-sunflower hover:bg-sunflower-dark text-foreground transition-colors disabled:opacity-50"
          >
            {isConnecting ? t("chat.connecting") : t("chat.start")}
          </button>
        )}
      </div>
    </div>
  );
}

export function ElevenLabsAgent({ managerName, codiceAgente }: { managerName: string; codiceAgente: string }) {
  return (
    <ConversationProvider>
      <ElevenLabsAgentInner managerName={managerName} codiceAgente={codiceAgente} />
    </ConversationProvider>
  );
}
