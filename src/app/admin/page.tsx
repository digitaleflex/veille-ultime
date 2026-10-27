"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [createdSlug, setCreatedSlug] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setSaving(true);
    try {
      const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Connexion refusée.");
      setAuthenticated(true); setPassword(""); setMessage("Session d’administration ouverte.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Erreur de connexion."); }
    finally { setSaving(false); }
  }

  async function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setSaving(true); setCreatedSlug("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"), excerpt: form.get("excerpt"), category: form.get("category"),
      content: form.get("content"), sources: form.get("sources"),
      tags: form.getAll("tags"),
    };
    try {
      const response = await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Enregistrement impossible.");
      setCreatedSlug(result.article.slug); setMessage("Brouillon enregistré dans la base de données.");
      event.currentTarget.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Erreur lors de l’enregistrement."); }
    finally { setSaving(false); }
  }

  const inputStyle = { width: "100%", background: "#111114", border: "1px solid #33333a", borderRadius: 8, padding: "12px 14px", color: "#f4f4f5", marginTop: 7 } as const;
  const labelStyle = { display: "block", color: "#d4d4d8", fontSize: 14, marginTop: 18 } as const;

  return <main style={{ minHeight: "100vh", background: "#09090b", color: "#f4f4f5", padding: "48px 20px" }}>
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <Link href="/" style={{ color: "#c5f441", textDecoration: "none" }}>← Veille Ultime</Link>
      <p style={{ color: "#c5f441", textTransform: "uppercase", letterSpacing: ".16em", fontSize: 12, marginTop: 34 }}>Espace éditorial privé</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-.04em", margin: "8px 0" }}>Rédiger un article</h1>
      <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>Les contenus enregistrés restent en brouillon jusqu’à leur validation. Ne publie pas de faits de sécurité sans références précises.</p>
      {!authenticated ? <form onSubmit={login} style={{ maxWidth: 480, marginTop: 32 }}>
        <label style={labelStyle}>Mot de passe d’administration<input style={inputStyle} type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} /></label>
        <button disabled={saving} style={{ marginTop: 20, background: "#c5f441", color: "#09090b", border: 0, borderRadius: 8, padding: "12px 18px", fontWeight: 700, cursor: "pointer" }}>{saving ? "Connexion…" : "Ouvrir la session"}</button>
      </form> : <form onSubmit={saveDraft} style={{ marginTop: 24 }}>
        <label style={labelStyle}>Titre<input name="title" required minLength={8} maxLength={220} style={inputStyle} placeholder="Titre factuel et précis" /></label>
        <label style={labelStyle}>Résumé<textarea name="excerpt" required minLength={20} maxLength={500} rows={3} style={inputStyle} placeholder="Que s’est-il passé et pourquoi est-ce important ?" /></label>
        <label style={labelStyle}>Catégorie<select name="category" required style={inputStyle} defaultValue="cybersecurite">
          <option value="actualites">Actualités</option><option value="cybersecurite">Cybersécurité</option><option value="vulnerabilites">Vulnérabilités</option><option value="developpement">Développement</option><option value="cloud-devops">Cloud & DevOps</option><option value="intelligence-artificielle">Intelligence artificielle</option><option value="open-source">Open source</option><option value="industrie-tech">Industrie tech</option><option value="bilans">Bilans & analyses</option>
        </select></label>
        <fieldset style={{ border: "1px solid #33333a", borderRadius: 8, padding: 14, marginTop: 20 }}><legend style={{ color: "#d4d4d8", padding: "0 6px" }}>Tags</legend>
          {["alerte","analyse","api","cloud","cve","devops","ia","open-source","patch","release","recherche","securite","incident","reglementation"].map(tag => <label key={tag} style={{ display: "inline-flex", gap: 7, alignItems: "center", margin: "7px 14px 7px 0", color: "#d4d4d8", fontSize: 13 }}><input type="checkbox" name="tags" value={tag} />{tag}</label>)}
        </fieldset>
        <label style={labelStyle}>Contenu Markdown<textarea name="content" required minLength={80} maxLength={50000} rows={16} style={{ ...inputStyle, fontFamily: "ui-monospace, monospace", lineHeight: 1.7 }} placeholder={"## Ce qui s’est passé\n\nLes faits confirmés…\n\n## Pourquoi c’est important\n\nAnalyse et limites…\n\n## À retenir\n\n- Action 1"} /></label>
        <label style={labelStyle}>Références (une URL par ligne)<textarea name="sources" required rows={4} style={{ ...inputStyle, fontFamily: "ui-monospace, monospace" }} placeholder={"https://avis-officiel.example/advisory"} /></label>
        <p style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>Minimum une référence HTTP(S). Le brouillon ne sera pas publié automatiquement.</p>
        <button disabled={saving} style={{ marginTop: 20, background: "#c5f441", color: "#09090b", border: 0, borderRadius: 8, padding: "12px 18px", fontWeight: 700, cursor: "pointer" }}>{saving ? "Enregistrement…" : "Enregistrer le brouillon"}</button>
      </form>}
      {message && <p role="status" style={{ marginTop: 20, padding: 14, border: "1px solid #33333a", borderRadius: 8, color: "#e4e4e7" }}>{message}{createdSlug && <> <Link href={"/actualites/" + createdSlug} style={{ color: "#c5f441" }}>Voir l’article</Link></>}</p>}
      <p style={{ color: "#71717a", fontSize: 12, marginTop: 42 }}>Accès protégé par secret serveur et cookie de session HTTP-only. Configure VEILLE_ADMIN_PASSWORD et VEILLE_ADMIN_SESSION_SECRET dans l’environnement de déploiement.</p>
    </div>
  </main>;
}
