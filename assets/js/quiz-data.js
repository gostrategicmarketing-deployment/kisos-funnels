/* The Founder Bottleneck Test: questions, scoring areas, archetypes.
   Each scored answer is 0 (runs without you) to 3 (runs through you).
   "kis" lines are kisos.com's own wording; tips are general advice, not KIS claims. */
(function () {
  "use strict";

  var AREAS = {
    onboarding: { name: "Onboarding", tip: "Write down every step from payment to a client's first session, and circle each step that needs you. Every circle is a handoff waiting to be owned.", kis: "Payment triggers intake. Onboarding routes the work, creates the client, assigns the coach, and begins Trainerize delivery." },
    team: { name: "Team questions", tip: "Keep a list of every question your team asks you this week. The ones that repeat need a written answer and a named owner, not you.", kis: "Each team member owns defined work with clear inputs and standards." },
    tools: { name: "Tool sprawl", tip: "List every app a new client touches. For each one decide: keep it, connect it, improve it, or migrate it.", kis: "Tools solve pieces. KIS OS owns the handoffs between them." },
    time_off: { name: "Time away", tip: "Pick one recurring task only you do and hand it to someone with a written checklist. Then test it by being unavailable for a day.", kis: "The team owns defined work, the Command Center surfaces exceptions, and the founder leads the next stage." },
    sales: { name: "Lead follow-up", tip: "Give every lead stage one named owner, including no-shows. If nobody owns a stage, it belongs to you by default.", kis: "A qualified lead enters the right pipeline and always has an owner." },
    retention: { name: "Retention signals", tip: "Decide the one early warning sign that a client is drifting (missed check-ins, no logins) and who gets told when it happens.", kis: "Retention signals are monitored across the journey and surface earlier." },
    visibility: { name: "Visibility", tip: "Pick five numbers that tell you how the week went and have one person send them to you at the same time every week.", kis: "Leadership sees what moved, what is stuck, who owns next, and what needs decisions." }
  };

  var QUESTIONS = [
    { area: "onboarding", emoji: "🌙", q: "It's 11:47 PM on a Saturday. Someone just paid for coaching. What happens next?", options: [
      { t: "Welcome email, intake, coach assigned, Trainerize ready. I find out Monday.", s: 0, r: "That's the dream. The system worked the night shift." },
      { t: "They get an automatic email. Everything else waits for Monday.", s: 1, r: "Half a handoff. They're excited now; Monday is a long way off." },
      { t: "I see the Stripe ping and onboard them from my phone.", s: 3, r: "Weekend onboarding from your phone counts as a shift." },
      { t: "Honestly? We might not notice for a day or two.", s: 3, r: "Fresh money, cold welcome. That's the most fragile moment in the journey." }
    ] },
    { area: "team", emoji: "💬", q: "A coach on your team has a question about a client's program. Where does it go?", options: [
      { t: "To the person who owns it. There's a doc for that.", s: 0, r: "Love it. Questions with owners don't end up in your DMs." },
      { t: "To a team lead, who sometimes asks me.", s: 1, r: "A buffer, with a back door straight to you." },
      { t: "My DMs.", s: 2, r: "Your DMs are a help desk with no hours." },
      { t: "My DMs. At 9 PM. As a voice memo.", s: 3, r: "Classic. The voice memo is how you know you're the operating system." }
    ] },
    { area: "tools", emoji: "🧩", type: "slider", q: "Count the apps a new client touches from payment to first workout.", hint: "Payments, forms, contracts, email, scheduling, coaching app, community, spreadsheets... all of it.", min: 1, max: 12,
      score: function (n) { return n <= 3 ? 0 : n <= 6 ? 1 : n <= 9 ? 2 : 3; },
      label: function (n) { return n <= 3 ? "Lean stack" : n <= 6 ? "Getting busy" : n <= 9 ? "App soup" : "Lost count"; },
      react: function (n) { return n <= 3 ? "Tidy. Fewer handoffs, fewer cracks." : n <= 6 ? "Every app is a handoff. Somebody owns those, right?" : "That's a lot of logins for one new client. Who connects them all?"; } },
    { area: "time_off", emoji: "🏝️", q: "You take two weeks off. Somewhere warm. Day 4: what does your phone look like?", options: [
      { t: "Quiet. The team has it.", s: 0, r: "That's a business. Enjoy the sunscreen." },
      { t: "A few check-ins. Nothing on fire.", s: 1, r: "Pretty good. Mostly runs, still leans on you." },
      { t: "Daily fires. I'm working from the beach chair.", s: 2, r: "A beach chair is just a desk with sand." },
      { t: "I don't take two weeks off.", s: 3, r: "That answer says more than the other three combined." }
    ] },
    { area: "sales", emoji: "📞", q: "A lead books a call and doesn't show. Who follows up?", options: [
      { t: "Automatic follow-up, and a setter owns the rebook.", s: 0, r: "Every lead has an owner. Nothing slips." },
      { t: "Our setter, if they remember.", s: 1, r: "\"If they remember\" is doing a lot of work there." },
      { t: "Me, when I notice.", s: 2, r: "And you notice... when you have a spare minute. So never?" },
      { t: "Nobody, honestly.", s: 3, r: "Paid for the click, lost the lead. Ouch." }
    ] },
    { area: "retention", emoji: "📉", q: "When do you find out a client is about to quit?", options: [
      { t: "Early. Warning signs get flagged to the right person.", s: 0, r: "Catching it early is half the save." },
      { t: "At their check-in, if they fill it out.", s: 1, r: "Decent, as long as the quiet ones still check in." },
      { t: "When they stop showing up.", s: 2, r: "By then they've mentally left." },
      { t: "When the cancellation hits Stripe.", s: 3, r: "The cancellation email is the last signal, not the first." }
    ] },
    { area: "visibility", emoji: "📊", q: "How do you know how the business did this week?", options: [
      { t: "One dashboard. I look, I decide.", s: 0, r: "Leaders with one view make faster calls." },
      { t: "The team sends me a report.", s: 1, r: "Solid. As long as somebody isn't rebuilding it by hand." },
      { t: "I piece it together from four tabs.", s: 2, r: "Weekly status reconstruction: a part-time job you never applied for." },
      { t: "Vibes.", s: 3, r: "Vibes are great for playlists. Less great for payroll." }
    ] },
    { area: null, key: "revenue", emoji: "📈", q: "Last one. How big is the machine right now?", hint: "Roughly what you collect in a month. It changes which next step we suggest.", options: [
      { t: "Under $10K a month", v: "0", r: "Early days. Good time to build it right." },
      { t: "$10K to $30K a month", v: "10000", r: "The stage where the cracks start to show." },
      { t: "$30K to $100K a month", v: "30000", r: "Real demand. This is where back ends start to creak." },
      { t: "$100K+ a month", v: "100000", r: "Big machine. Every handoff matters more at this size." }
    ] }
  ];

  var ARCHETYPES = [
    { id: "architect", max: 25, emoji: "🏛️", name: "The Architect", line: "Your business runs on systems, not on you.",
      body: "Most of the journey moves without you in the middle. Your next ceiling is less about fixing handoffs and more about seeing everything in one place and scaling what already works." },
    { id: "controller", max: 50, emoji: "🛫", name: "The Air Traffic Controller", line: "Systems exist. Everything still lands on your radar.",
      body: "A lot runs on its own, but the exceptions route to you. You're not doing every job, you're watching every job. That attention is the thing holding your next stage back." },
    { id: "duct-tape", max: 75, emoji: "🩹", name: "The Duct-Tape Engineer", line: "Clever workarounds are holding the whole thing together.",
      body: "You've built a lot, and it mostly works, as long as you're there to patch the gaps between the tools. More clients means more tape. Your business has outgrown the duct tape." },
    { id: "switchboard", max: 100, emoji: "🎛️", name: "The Switchboard Operator", line: "Every handoff plugs in through you.",
      body: "Sales, onboarding, coach questions, follow-up: you're the one connecting the calls. That makes you the operating system. It's not a people problem. It's a systems problem." }
  ];

  var ORDER = ["onboarding", "team", "tools", "time_off", "sales", "retention", "visibility"];

  function archetype(score) {
    for (var i = 0; i < ARCHETYPES.length; i++) if (score <= ARCHETYPES[i].max) return ARCHETYPES[i];
    return ARCHETYPES[ARCHETYPES.length - 1];
  }

  window.KISQ = { AREAS: AREAS, QUESTIONS: QUESTIONS, ARCHETYPES: ARCHETYPES, ORDER: ORDER, archetype: archetype };
})();
