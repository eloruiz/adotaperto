import { useState } from 'react';
import type { FormEvent } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import type { Animal, Organizacao } from '../types';
import { linkWhatsApp } from '../lib/utils';

interface TenhoInteresseFormProps {
  animal: Animal;
  org: Organizacao;
}

/**
 * Formulário "Tenho interesse": monta uma mensagem de WhatsApp para a ONG.
 * Nada é armazenado — os dados digitados existem apenas na mensagem
 * que o usuário decide enviar pelo WhatsApp.
 */
export function TenhoInteresseForm({ animal, org }: TenhoInteresseFormProps) {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  function montarMensagem(): string {
    const partes = [
      `Olá! Vim pelo site AdotaPerto e tenho interesse em saber mais sobre ${animal.nome}.`,
      `Animal: ${animal.nome} (${animal.especie === 'cao' ? 'cão' : 'gato'}) — ${org.nome}, ${org.cidade}/${org.estado}.`,
    ];
    if (mensagem.trim()) partes.push(mensagem.trim());
    if (nome.trim()) partes.push(`— ${nome.trim()}`);
    return partes.join('\n');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(linkWhatsApp(org.whatsapp, montarMensagem()), '_blank', 'noreferrer');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-3xl border border-sand bg-white p-5 shadow-card"
    >
      <h2 className="flex items-center gap-2 font-extrabold text-sage-900">
        <MessageCircle className="h-5 w-5 text-emerald-600" />
        Tenho interesse em {animal.nome}
      </h2>
      <p className="text-xs text-stone-400">
        Opcional: personalize a mensagem. Seus dados não são salvos — eles só
        aparecem na mensagem que você enviar pelo WhatsApp.
      </p>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome (opcional)"
        aria-label="Seu nome (opcional)"
        className="w-full rounded-xl border border-sand-200 bg-cream/60 px-3.5 py-2.5 text-sm font-medium text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-sage-300 focus:bg-white focus:ring-4 focus:ring-sage-100"
      />
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Escreva uma mensagem para a organização (opcional)"
        aria-label="Mensagem para a organização (opcional)"
        rows={3}
        className="w-full resize-none rounded-xl border border-sand-200 bg-cream/60 px-3.5 py-2.5 text-sm font-medium text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-sage-300 focus:bg-white focus:ring-4 focus:ring-sage-100"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-2xl bg-coral-500 px-5 py-3.5 font-bold text-white shadow-soft transition hover:bg-coral-600"
      >
        <Send className="h-4 w-4" />
        Enviar mensagem pelo WhatsApp
      </button>
    </form>
  );
}
