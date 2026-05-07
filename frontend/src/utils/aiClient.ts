import axios from 'axios';

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };
type ResponseFormat =
    | { type: 'json_object' }
    | { type: 'json_schema'; json_schema: unknown }
    | Record<string, unknown>;

const getApiBaseUrl = () => {
    const raw = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
    return raw ? String(raw).replace(/\/+$/, '') : '';
};

const isOllamaModel = (model?: string) => {
    if (!model || typeof model !== 'string') return false;
    return model.startsWith('ollama:') || model.startsWith('ollama/');
};

const toOllamaModelName = (model: string) => model.replace(/^ollama[:/]/, '');

const getOllamaBaseUrl = () => {
    const raw = (import.meta as any).env?.VITE_OLLAMA_BASE_URL as string | undefined;
    return (raw ? String(raw) : 'http://127.0.0.1:11434').replace(/\/+$/, '');
};

const getOpenRouterApiKey = () => {
    const raw = (import.meta as any).env?.VITE_OPENROUTER_API_KEY as string | undefined;
    return raw ? String(raw).trim() : '';
};

export const chatCompletion = async (payload: {
    model: string;
    messages: ChatMessage[];
    response_format?: ResponseFormat;
    format?: unknown; // Ollama native /api/chat format (e.g. "json" or JSON schema)
}) => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
        const url = `${apiBase}/api/ai/chat`;
        try {
            const res = await axios.post(url, payload);
            return res.data;
        } catch (err: any) {
            const status = err?.response?.status;
            const serverError = err?.response?.data?.error;
            if (!status) {
                throw new Error(`Network Error: tidak bisa mengakses backend API di ${apiBase}. Pastikan backend sedang jalan.`);
            }
            throw new Error(`Backend error (${status}): ${serverError || err?.message || 'AI request gagal.'}`);
        }
    }

    if (isOllamaModel(payload.model)) {
        const base = getOllamaBaseUrl();
        const model = toOllamaModelName(payload.model);
        const url = `${base}/api/chat`;
        try {
            const res = await axios.post(url, {
                model,
                messages: payload.messages,
                stream: false,
                format: payload.format
            });
            return res.data;
        } catch (err: any) {
            const status = err?.response?.status;
            const serverError = err?.response?.data?.error;
            if (!status) {
                throw new Error(
                    `Network Error: tidak bisa mengakses Ollama di ${base}. ` +
                        `Pastikan Ollama running (cek: "ollama list") dan izinkan CORS origin web Anda.`
                );
            }
            throw new Error(`Ollama error (${status}): ${serverError || err?.message || 'Request gagal.'}`);
        }
    }

    const OPENROUTER_API_KEY = getOpenRouterApiKey();
    if (!OPENROUTER_API_KEY) {
        throw new Error('OPENROUTER key belum di-set. Isi `VITE_OPENROUTER_API_KEY` di frontend/.env.');
    }

    const response_format =
        payload.response_format || (payload.format === 'json' ? ({ type: 'json_object' } as const) : undefined);

    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: payload.model,
                messages: payload.messages,
                ...(response_format ? { response_format } : {})
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : undefined,
                    'X-Title': 'DirectRoute AI (frontend-only)'
                }
            }
        );
        return res.data;
    } catch (err: any) {
        const status = err?.response?.status;
        const serverError = err?.response?.data?.error || err?.response?.data;
        if (!status) {
            throw new Error('Network Error: gagal menghubungi OpenRouter.');
        }
        throw new Error(`OpenRouter error (${status}): ${typeof serverError === 'string' ? serverError : JSON.stringify(serverError)}`);
    }
};

export const serperSearch = async (query: string) => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
        try {
            const url = `${apiBase}/api/search`;
            const res = await axios.post(url, { q: query });
            return res.data;
        } catch (err: any) {
            const serverMsg = err?.response?.data?.error;
            console.warn('Server Serper proxy failed, falling back to client key (dev only).', serverMsg || err?.message);
        }
    }

    const SERPER_API_KEY = (import.meta as any).env?.VITE_SERPER_API_KEY as string | undefined;
    if (!SERPER_API_KEY) {
        throw new Error('Serper API key missing. Set VITE_API_BASE_URL (recommended) atau VITE_SERPER_API_KEY (dev only).');
    }

    const res = await axios.post(
        'https://google.serper.dev/search',
        { q: query },
        { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    return res.data;
};

export const serperImages = async (query: string) => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
        try {
            const url = `${apiBase}/api/search/images`;
            const res = await axios.post(url, { q: query });
            return res.data;
        } catch (err: any) {
            const serverMsg = err?.response?.data?.error;
            console.warn('Server Serper images proxy failed, falling back to client key (dev only).', serverMsg || err?.message);
        }
    }

    const SERPER_API_KEY = (import.meta as any).env?.VITE_SERPER_API_KEY as string | undefined;
    if (!SERPER_API_KEY) {
        throw new Error('Serper API key missing. Set VITE_API_BASE_URL (recommended) atau VITE_SERPER_API_KEY (dev only).');
    }

    const res = await axios.post(
        'https://google.serper.dev/images',
        { q: query },
        { headers: { 'X-API-KEY': SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    return res.data;
};
