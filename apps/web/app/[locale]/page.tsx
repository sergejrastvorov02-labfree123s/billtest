export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section>
        <h1 className="text-4xl font-bold">Premium Minecraft Hosting</h1>
        <p>Real-time provisioning via Pterodactyl, multi-currency billing, and self-service control panel.</p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article><h2>Instant Deploy</h2><p>Provisioning jobs with retry/resync orchestration.</p></article>
        <article><h2>Billing Core</h2><p>Invoices, balance ledger, payments, renewals and promo logic.</p></article>
        <article><h2>Support & CMS</h2><p>Tickets, knowledge base, status page, and multilingual content.</p></article>
      </section>
    </main>
  );
}
