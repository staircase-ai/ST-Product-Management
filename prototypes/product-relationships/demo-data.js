const DEMO_DATA = {
  account: {
    name: "Gainsight",
    initials: "GS",
    avatarColor: "#F97316",
    healthScore: 79,
    status: "Active",
    owner: "Sarah Kim",
    tier: "Strategic",
    totalARR: "$1.9M"
  },

  // Account-level summaries — one for "all" products, one per product filter
  summaries: {
    "all": {
      status: "Heating",
      generatedAt: "Feb 28, 2026 2:15 PM",
      narrative: "Gainsight is a strategic account showing strong overall momentum with a clear expansion path on the core CS platform. Executive engagement has intensified over the past quarter, with VP Customer Success Sarah Chen driving adoption conversations across multiple products. However, the account carries a mixed risk profile — the Skilljar training platform is under competitive evaluation, and Staircase AI adoption in the APAC region has stalled.",
      bullets: [
        {
          label: "Expansion Momentum",
          text: "Gainsight CS Copilot pilot exceeded expectations with CSMs saving 3 hours/week on account prep. VP CS formally requested 50-seat rollout, and CFO David Park has approved the expansion budget. Revenue impact estimated at $180K incremental ARR."
        },
        {
          label: "Executive Engagement",
          text: "Sarah Chen (VP CS) has participated in 4 meetings in the past 30 days — up from 1/month average. She's driving strategic conversations across CS, Community, and is personally sponsoring the Copilot expansion. Sentiment is strongly positive."
        },
        {
          label: "Competitive Threat — Skilljar",
          text: "Director of Enablement Jennifer Adams mentioned evaluating Docebo during a recent QBR follow-up. Training completion rates dropped 15% last quarter, and a key team transition (new Training Manager ramping) adds uncertainty. Renewal is Jun 2026."
        },
        {
          label: "APAC Adoption Gap — Staircase AI",
          text: "Lisa Wang (CS Lead APAC) hasn't engaged with the Staircase platform in 3 weeks and has requested additional training for her team. While the NA team shows strong usage, the APAC gap risks undermining the overall deployment story."
        },
        {
          label: "Community-Led Growth",
          text: "Customer Community is a quiet success — 500+ active members, NPS at 72, and 30% tier-1 support deflection. Community Manager Rachel Kim is requesting enterprise tier features (SSO, advanced moderation) to scale further."
        },
        {
          label: "Cross-Product Dependencies",
          text: "The Staircase AI adoption gap is limiting the quality of account intelligence feeding back into Gainsight CS. Resolving APAC onboarding would strengthen insights for the broader CS team and improve expansion signal coverage."
        }
      ],
      conclusion: "Net account trajectory is positive, driven by the Gainsight CS expansion opportunity and strong executive engagement. Priority actions: close the Copilot expansion, address the Skilljar competitive threat before the June renewal, and unblock APAC adoption for Staircase AI."
    },

    "gainsight-cs": {
      status: "Heating",
      generatedAt: "Feb 28, 2026 2:15 PM",
      narrative: "Gainsight CS is the anchor product in this account, and the relationship is in its strongest position in over a year. The recent Executive Business Review surfaced a clear expansion opportunity around Copilot AI, with VP CS Sarah Chen personally championing the rollout. CS Ops Lead Mark Liu ran a successful 30-day pilot that showed measurable productivity gains, and CFO David Park has approved the incremental budget.",
      bullets: [
        {
          label: "Copilot Expansion Pipeline",
          text: "50-seat expansion formally requested after pilot showed CSMs saving 3 hours/week. Budget approved by CFO. Target rollout by Q3 2026. Estimated $180K incremental ARR."
        },
        {
          label: "Executive Sponsor Activation",
          text: "Sarah Chen has shifted from passive sponsor to active champion — 4 meetings in 30 days, directly emailing about pilot results, and connecting Gainsight CS outcomes to her board-level CS strategy."
        },
        {
          label: "Integration Depth",
          text: "Mark Liu's team is building custom dashboards via the API, signaling deep technical investment. They've submitted integration support tickets and are extending beyond standard usage patterns."
        },
        {
          label: "Renewal Position",
          text: "Sep 2026 renewal is well-positioned. No active risk signals. Expansion conversation will likely fold into renewal negotiation, creating a natural upsell moment."
        }
      ],
      conclusion: "Gainsight CS is on a strong trajectory. The primary action is to close the Copilot expansion before the September renewal window, using the pilot results as evidence."
    },

    "staircase-ai": {
      status: "Monitoring",
      generatedAt: "Feb 28, 2026 2:15 PM",
      narrative: "Staircase AI is 6 months into deployment and showing divergent adoption patterns by region. The North America team, led by champion David Park, is actively using Risk Analyst and seeing tangible results — including catching a churn signal 6 weeks early. However, the APAC region under Lisa Wang has effectively stalled, with no meaningful engagement in the past 3 weeks. The RevOps team has expressed interest in the Ask Staircase Slack integration, which could deepen daily usage.",
      bullets: [
        {
          label: "NA Success Story",
          text: "Risk Analyst caught the Acme Corp churn signal 6 weeks before renewal — David Park called this out as justifying the entire investment. Data Analyst James Foster is building automated workflows."
        },
        {
          label: "APAC Adoption Risk",
          text: "Lisa Wang's team hasn't logged meaningful activity in 3 weeks. She's requested additional training, suggesting the initial onboarding didn't land. This gap affects 40% of the intended user base."
        },
        {
          label: "Champion Bandwidth",
          text: "David Park is enthusiastic but stretched across multiple strategic initiatives. He's the primary champion for both Staircase AI and acts as CFO-side decision maker for Gainsight CS expansion. Risk of attention drift."
        },
        {
          label: "Slack Integration Interest",
          text: "RevOps team wants real-time alerts in Slack via Ask Staircase. This would embed Staircase AI into daily workflows and improve the adoption story beyond the current dashboard-only usage."
        }
      ],
      conclusion: "The deployment is at an inflection point — NA success needs to be replicated in APAC before the Mar 2027 renewal conversation begins. Schedule APAC-focused training and explore the Slack integration as an adoption accelerator."
    },

    "skilljar": {
      status: "At Risk",
      generatedAt: "Feb 28, 2026 2:15 PM",
      narrative: "Skilljar is the most at-risk product in the Gainsight account. Training completion rates have dropped 15% quarter-over-quarter, the previous Training Manager departed, and Director of Enablement Jennifer Adams explicitly mentioned evaluating Docebo as an alternative. New Training Manager Tom Garcia is still ramping and has flagged documentation gaps from his predecessor. The June 2026 renewal is the nearest-term renewal in the account.",
      bullets: [
        {
          label: "Competitive Evaluation",
          text: "Jennifer Adams named Docebo specifically in a QBR follow-up email, citing their analytics capabilities. This is an active evaluation, not a passing mention — she framed it as needing to 'see improvement this quarter.'"
        },
        {
          label: "Completion Rate Decline",
          text: "15% drop in training completion rates last quarter. No single root cause identified yet — likely a combination of stale content, team transition, and reduced enablement focus during the manager changeover."
        },
        {
          label: "Team Transition",
          text: "Tom Garcia (new Training Manager) is ramping and has described the inherited documentation as 'sparse.' He needs support to get up to speed and refresh the content library before the renewal conversation."
        },
        {
          label: "Renewal Timeline",
          text: "June 2026 renewal is the nearest in the account. Current signals suggest this will be a contested renewal unless completion rates recover and Jennifer sees tangible improvement."
        }
      ],
      conclusion: "This is a save situation. Priority actions: schedule a content audit workshop with Tom Garcia, prepare a competitive differentiation deck against Docebo, and get Jennifer Adams a clear improvement plan before the June renewal."
    },

    "customer-community": {
      status: "Thriving",
      generatedAt: "Feb 28, 2026 2:15 PM",
      narrative: "Customer Community is a bright spot — high engagement, organic growth, and clear business value through support deflection. Community Manager Rachel Kim has built a thriving ecosystem of 500+ active members, and the community NPS hit 72 this month. VP CS Sarah Chen views the community as strategically important for reducing support load. The main ask is an upgrade to the enterprise tier for SSO and advanced moderation capabilities.",
      bullets: [
        {
          label: "Organic Growth",
          text: "500+ active members with feature request volume up 40% quarter-over-quarter. This growth is organic — no major campaigns or incentive programs driving it. Members are self-organizing around product topics."
        },
        {
          label: "Support Deflection Impact",
          text: "Sarah Chen cited 30% tier-1 support ticket deflection attributable to community content. She described this as 'strategic' and is using it in her board-level CS efficiency narrative."
        },
        {
          label: "Enterprise Tier Request",
          text: "Rachel Kim has formally requested SSO and advanced moderation tools. This is an expansion opportunity — enterprise tier upgrade would increase ARR and deepen the integration with Gainsight's security requirements."
        },
        {
          label: "Cross-Product Value",
          text: "Community discussions surface product feedback that feeds into Gainsight CS account intelligence. Rachel Kim also manages Skilljar community content, creating a natural bridge between training and community engagement."
        }
      ],
      conclusion: "The community is operating well above expectations. The enterprise tier expansion is a natural next step — position it as enabling scale for the support deflection ROI that Sarah Chen is already evangelizing internally."
    }
  },

  // Product intelligence cards — one per product
  products: [
    {
      id: "gainsight-cs",
      name: "Gainsight CS",
      type: "Platform",
      healthScore: 82,
      healthLevel: "healthy",
      status: "active",
      arr: "$1,250,000",
      renewalDate: "Sep 2026",

      // Collapsed card data
      stakeholderCount: 12,
      conversationCount: 87,
      hasExpansion: true,
      hasRisk: false,
      expansionCount: 1,
      riskCount: 0,
      summary: "Strong adoption with growing executive engagement. Recent EBR signals strategic expansion interest in Copilot AI capabilities.",
      nextAction: "Schedule follow-up with VP CS on Copilot team rollout (CSM)",

      // Expanded: Full narrative
      fullNarrative: "Gainsight CS is the anchor product in this account and the relationship is in its strongest position in over a year. VP Customer Success Sarah Chen has shifted from a quarterly check-in cadence to active weekly engagement — she participated in 4 meetings in the past 30 days alone. The recent Executive Business Review surfaced a formal expansion request: Sarah wants to roll out Copilot AI to the full 50-person CS team after CS Ops Lead Mark Liu ran a successful 30-day pilot. CFO David Park has already approved the incremental budget. Meanwhile, Mark Liu's team is building custom API integrations, signaling deep technical investment that strengthens the overall platform stickiness.",

      // Expanded: Stakeholders
      stakeholders: [
        {
          name: "Sarah Chen",
          role: "VP Customer Success",
          persona: "Executive Sponsor",
          engagement: "high",
          sentiment: "positive",
          lastContact: "3 days ago"
        },
        {
          name: "Mark Liu",
          role: "CS Ops Lead",
          persona: "Champion",
          engagement: "high",
          sentiment: "positive",
          lastContact: "3 days ago"
        },
        {
          name: "David Park",
          role: "CFO",
          persona: "Decision Maker",
          engagement: "medium",
          sentiment: "positive",
          lastContact: "1 week ago"
        },
        {
          name: "Amy Rodriguez",
          role: "CSM Lead",
          persona: "Power User",
          engagement: "high",
          sentiment: "positive",
          lastContact: "2 days ago"
        }
      ],

      // Expanded: Signals
      signals: [
        {
          type: "expansion",
          title: "Copilot AI expansion — 50 seats requested",
          description: "VP CS formally requested Copilot rollout to full CS team after successful 30-day pilot. Budget approved by CFO. CSMs reported saving 3 hours per week on account preparation during the pilot period.",
          confidence: "high",
          source: "Email from Sarah Chen, Feb 25"
        }
      ],

      // Expanded: Recent engagements
      recentEngagements: [
        {
          type: "meeting",
          title: "Executive Business Review — Q1 planning",
          timeAgo: "1 week ago",
          participants: ["Sarah Chen", "David Park", "Mark Liu", "Sarah Kim"]
        },
        {
          type: "email",
          title: "Copilot pilot results and rollout request",
          timeAgo: "3 days ago",
          participants: ["Sarah Chen", "Sarah Kim"]
        },
        {
          type: "ticket",
          title: "API integration support — custom dashboard build",
          timeAgo: "5 days ago",
          participants: ["Mark Liu", "Support Team"]
        },
        {
          type: "meeting",
          title: "Copilot pilot kickoff — CS Ops team",
          timeAgo: "4 weeks ago",
          participants: ["Mark Liu", "Amy Rodriguez", "Sarah Kim"]
        }
      ],

      // Expanded: References with direct quotes
      references: [
        {
          type: "email",
          context: "VP CS shared Copilot pilot results and expansion request",
          quote: "The Copilot pilot results exceeded expectations — our CSMs are saving 3 hours per week on account prep. We want to roll this out to the full team by Q3.",
          attribution: "Sarah Chen, VP Customer Success",
          date: "Feb 25, 2026"
        },
        {
          type: "meeting",
          context: "EBR discussion on platform investment and expansion budget",
          quote: "I've reviewed the business case for the Copilot expansion. The productivity gains Mark's team demonstrated make this a straightforward budget approval on my end.",
          attribution: "David Park, CFO",
          date: "Feb 21, 2026"
        },
        {
          type: "chat",
          context: "CS Ops Lead asking about API capabilities for custom builds",
          quote: "Can we get API access for the custom dashboard we're building? We want to pull health scores directly into our internal reporting tool.",
          attribution: "Mark Liu, CS Ops Lead",
          date: "Feb 23, 2026"
        }
      ]
    },

    {
      id: "staircase-ai",
      name: "Staircase AI",
      type: "Add-on",
      healthScore: 74,
      healthLevel: "monitor",
      status: "active",
      arr: "$380,000",
      renewalDate: "Mar 2027",

      // Collapsed card data
      stakeholderCount: 8,
      conversationCount: 34,
      hasExpansion: true,
      hasRisk: true,
      expansionCount: 1,
      riskCount: 2,
      summary: "Strong NA adoption with Risk Analyst delivering early wins. APAC region adoption has stalled — training request outstanding.",
      nextAction: "Schedule APAC-focused training session with Lisa Wang's team (CSM)",

      // Expanded: Full narrative
      fullNarrative: "Staircase AI is 6 months into its deployment and telling two very different stories by region. In North America, champion David Park and Data Analyst James Foster are actively using Risk Analyst and building automated workflows — they caught the Acme Corp churn signal 6 weeks before renewal, which David called out as justifying the entire investment. However, the APAC region under CS Lead Lisa Wang has effectively gone dark, with no meaningful platform engagement in 3 weeks. Lisa has requested additional training, suggesting the initial onboarding didn't adequately address her team's workflow. Meanwhile, the RevOps team is interested in the Ask Staircase Slack integration to embed alerts into their daily workflow, which could serve as an adoption accelerant across both regions.",

      // Expanded: Stakeholders
      stakeholders: [
        {
          name: "David Park",
          role: "Director of RevOps",
          persona: "Champion",
          engagement: "high",
          sentiment: "positive",
          lastContact: "4 days ago"
        },
        {
          name: "Lisa Wang",
          role: "CS Lead, APAC",
          persona: "Power User",
          engagement: "low",
          sentiment: "neutral",
          lastContact: "3 weeks ago"
        },
        {
          name: "James Foster",
          role: "Data Analyst",
          persona: "Power User",
          engagement: "high",
          sentiment: "positive",
          lastContact: "1 week ago"
        }
      ],

      // Expanded: Signals
      signals: [
        {
          type: "expansion",
          title: "Ask Staircase Slack integration — RevOps team request",
          description: "RevOps team wants real-time risk and expansion alerts delivered directly to Slack channels. David Park sees this as the path to embedding Staircase into daily workflows beyond the dashboard.",
          confidence: "medium",
          source: "Meeting with David Park, Feb 24"
        },
        {
          type: "risk",
          title: "APAC region adoption gap — no engagement in 3 weeks",
          description: "Lisa Wang's APAC CS team has not logged meaningful activity since early February. She's requested additional training, indicating the initial onboarding didn't land with her team. This affects 40% of the intended user base.",
          confidence: "high",
          source: "Email from Lisa Wang, Feb 21"
        },
        {
          type: "risk",
          title: "Champion bandwidth constraint — David Park stretched thin",
          description: "David Park is the primary internal champion but is also the CFO-side decision maker for the Gainsight CS Copilot expansion. Multiple competing priorities risk attention drift from Staircase AI advocacy.",
          confidence: "medium",
          source: "Observation from recent meeting cadence"
        }
      ],

      // Expanded: Recent engagements
      recentEngagements: [
        {
          type: "meeting",
          title: "Risk Analyst quarterly review — NA team results",
          timeAgo: "4 days ago",
          participants: ["David Park", "James Foster", "Sarah Kim"]
        },
        {
          type: "email",
          title: "APAC training request — additional onboarding sessions",
          timeAgo: "1 week ago",
          participants: ["Lisa Wang", "Sarah Kim"]
        },
        {
          type: "ticket",
          title: "Data source connection — Salesforce APAC instance",
          timeAgo: "2 weeks ago",
          participants: ["Lisa Wang", "Support Team"]
        },
        {
          type: "meeting",
          title: "Ask Staircase Slack integration discovery call",
          timeAgo: "4 days ago",
          participants: ["David Park", "James Foster", "Sarah Kim"]
        }
      ],

      // Expanded: References with direct quotes
      references: [
        {
          type: "meeting",
          context: "Risk Analyst review — David Park on early wins and ROI",
          quote: "Risk Analyst caught the Acme churn signal 6 weeks before renewal — that alone justified the investment. We need the rest of the org to see this value.",
          attribution: "David Park, Director of RevOps",
          date: "Feb 24, 2026"
        },
        {
          type: "email",
          context: "APAC CS Lead requesting follow-up training for her team",
          quote: "We're still getting the APAC team comfortable with the platform — can we schedule another training session? The initial walkthrough was too high-level for our workflow.",
          attribution: "Lisa Wang, CS Lead APAC",
          date: "Feb 21, 2026"
        },
        {
          type: "meeting",
          context: "Data Analyst describing automated risk monitoring setup",
          quote: "I've set up automated alerts for any account dropping below 70 health score. We're catching signals the CSMs were missing in their manual reviews.",
          attribution: "James Foster, Data Analyst",
          date: "Feb 24, 2026"
        }
      ]
    },

    {
      id: "skilljar",
      name: "Skilljar",
      type: "Add-on",
      healthScore: 68,
      healthLevel: "at-risk",
      status: "active",
      arr: "$175,000",
      renewalDate: "Jun 2026",

      // Collapsed card data
      stakeholderCount: 5,
      conversationCount: 23,
      hasExpansion: false,
      hasRisk: true,
      expansionCount: 0,
      riskCount: 3,
      summary: "Training completion rates dropped 15% last quarter. Director of Enablement evaluating Docebo. Team transition adding uncertainty.",
      nextAction: "Schedule content audit workshop with new Training Manager (CSM)",

      // Expanded: Full narrative
      fullNarrative: "Skilljar is the most at-risk product in the Gainsight account and requires immediate attention. Training completion rates have declined 15% quarter-over-quarter, and the previous Training Manager left the company two months ago. Director of Enablement Jennifer Adams has explicitly mentioned Docebo as an alternative she's evaluating — she framed this as needing to see 'improvement this quarter' in a recent QBR follow-up email. New Training Manager Tom Garcia is ramping but struggling with sparse documentation left by his predecessor. The June 2026 renewal is the nearest renewal in the account, giving the team limited runway to demonstrate improvement before the decision window opens.",

      // Expanded: Stakeholders
      stakeholders: [
        {
          name: "Jennifer Adams",
          role: "Director of Enablement",
          persona: "Decision Maker",
          engagement: "medium",
          sentiment: "neutral",
          lastContact: "2 days ago"
        },
        {
          name: "Tom Garcia",
          role: "Training Manager",
          persona: "Power User",
          engagement: "medium",
          sentiment: "neutral",
          lastContact: "1 week ago"
        },
        {
          name: "Rachel Kim",
          role: "Community Manager",
          persona: "Champion",
          engagement: "medium",
          sentiment: "positive",
          lastContact: "2 days ago"
        }
      ],

      // Expanded: Signals
      signals: [
        {
          type: "risk",
          title: "Docebo competitive evaluation — active comparison",
          description: "Director of Enablement Jennifer Adams explicitly named Docebo in a QBR follow-up email, citing their analytics capabilities as a differentiator. She framed this as a conditional: improvement must be visible this quarter.",
          confidence: "high",
          source: "Email from Jennifer Adams, Feb 26"
        },
        {
          type: "risk",
          title: "Training completion rate decline — 15% drop QoQ",
          description: "Completion rates have fallen from 78% to 63% over the past quarter. No single root cause identified — likely a combination of stale content, reduced enablement focus during the manager changeover, and shifting team priorities.",
          confidence: "high",
          source: "QBR data review, Feb 19"
        },
        {
          type: "risk",
          title: "Team transition — new Training Manager still ramping",
          description: "Tom Garcia joined 6 weeks ago and is still getting up to speed on the content library. He's described the inherited documentation as 'sparse' and needs support to refresh the training catalog before the renewal conversation.",
          confidence: "medium",
          source: "Meeting with Tom Garcia, Feb 19"
        }
      ],

      // Expanded: Recent engagements
      recentEngagements: [
        {
          type: "email",
          title: "QBR follow-up — completion rates and competitive evaluation",
          timeAgo: "2 days ago",
          participants: ["Jennifer Adams", "Sarah Kim"]
        },
        {
          type: "meeting",
          title: "Content audit planning — training catalog review",
          timeAgo: "1 week ago",
          participants: ["Tom Garcia", "Rachel Kim", "Sarah Kim"]
        },
        {
          type: "ticket",
          title: "LMS analytics comparison — feature gap analysis request",
          timeAgo: "10 days ago",
          participants: ["Jennifer Adams", "Support Team"]
        }
      ],

      // Expanded: References with direct quotes
      references: [
        {
          type: "email",
          context: "Director of Enablement expressing urgency around improvement and naming competitor",
          quote: "We need to see improvement in completion rates this quarter. The team is looking at alternatives including Docebo for the analytics tier — their reporting capabilities are ahead of what we're getting today.",
          attribution: "Jennifer Adams, Director of Enablement",
          date: "Feb 26, 2026"
        },
        {
          type: "meeting",
          context: "New Training Manager describing the onboarding challenge and documentation gaps",
          quote: "I'm still getting up to speed on the content library — the previous manager's documentation was sparse. I need at least another month before I can give you a confident content refresh plan.",
          attribution: "Tom Garcia, Training Manager",
          date: "Feb 19, 2026"
        },
        {
          type: "meeting",
          context: "Community Manager connecting training content to community engagement patterns",
          quote: "The community members are asking for updated training paths — the current content doesn't reflect the features we shipped in Q4. That's probably contributing to the completion drop-off.",
          attribution: "Rachel Kim, Community Manager",
          date: "Feb 19, 2026"
        }
      ]
    },

    {
      id: "customer-community",
      name: "Customer Community",
      type: "Service",
      healthScore: 91,
      healthLevel: "healthy",
      status: "active",
      arr: "$95,000",
      renewalDate: "Dec 2026",

      // Collapsed card data
      stakeholderCount: 6,
      conversationCount: 41,
      hasExpansion: true,
      hasRisk: false,
      expansionCount: 1,
      riskCount: 0,
      summary: "Thriving community with 500+ active members and NPS at 72. Requesting enterprise tier upgrade for SSO and moderation tools.",
      nextAction: "Prepare enterprise tier proposal with SSO and moderation scope (AE)",

      // Expanded: Full narrative
      fullNarrative: "Customer Community is the highest-health product in the account and a genuine success story. Community Manager Rachel Kim has built an engaged ecosystem of 500+ active members, with feature request volume up 40% quarter-over-quarter — all organic growth with no incentive programs driving it. VP CS Sarah Chen views the community as strategically important, citing 30% tier-1 support ticket deflection in her board-level CS efficiency narrative. Rachel has formally requested an upgrade to the enterprise tier to unlock SSO integration and advanced moderation tools, which would deepen the platform's integration with Gainsight's security and compliance requirements. The community also serves as a cross-product bridge — members discuss training content (Skilljar), product feedback (Gainsight CS), and adoption best practices.",

      // Expanded: Stakeholders
      stakeholders: [
        {
          name: "Rachel Kim",
          role: "Community Manager",
          persona: "Champion",
          engagement: "high",
          sentiment: "positive",
          lastContact: "2 days ago"
        },
        {
          name: "Sarah Chen",
          role: "VP Customer Success",
          persona: "Executive Sponsor",
          engagement: "medium",
          sentiment: "positive",
          lastContact: "1 week ago"
        },
        {
          name: "Mike Torres",
          role: "Support Lead",
          persona: "Power User",
          engagement: "high",
          sentiment: "positive",
          lastContact: "3 days ago"
        }
      ],

      // Expanded: Signals
      signals: [
        {
          type: "expansion",
          title: "Enterprise tier upgrade — SSO and advanced moderation",
          description: "Community Manager Rachel Kim formally requested SSO and advanced moderation tools. Enterprise tier upgrade would increase ARR and align with Gainsight's security requirements. VP CS supports this as strategic for scaling the support deflection model.",
          confidence: "high",
          source: "Email from Rachel Kim, Feb 23"
        }
      ],

      // Expanded: Recent engagements
      recentEngagements: [
        {
          type: "meeting",
          title: "Community metrics review — Q1 engagement and NPS",
          timeAgo: "2 days ago",
          participants: ["Rachel Kim", "Sarah Kim"]
        },
        {
          type: "email",
          title: "Enterprise tier features request — SSO and moderation",
          timeAgo: "5 days ago",
          participants: ["Rachel Kim", "Sarah Kim"]
        },
        {
          type: "meeting",
          title: "Community event planning — Spring user conference",
          timeAgo: "1 week ago",
          participants: ["Rachel Kim", "Mike Torres", "Sarah Chen"]
        },
        {
          type: "chat",
          title: "Support deflection metrics — monthly review",
          timeAgo: "3 days ago",
          participants: ["Mike Torres", "Rachel Kim"]
        }
      ],

      // Expanded: References with direct quotes
      references: [
        {
          type: "email",
          context: "Community Manager sharing NPS milestone and enterprise tier request",
          quote: "Our community NPS hit 72 this month — highest ever. We're ready for the enterprise tier to support SSO and the advanced moderation tools. The current plan is limiting our ability to scale.",
          attribution: "Rachel Kim, Community Manager",
          date: "Feb 23, 2026"
        },
        {
          type: "meeting",
          context: "VP CS citing community's strategic value for support efficiency",
          quote: "The community is deflecting 30% of tier-1 support tickets. This is strategic — I'm including it in our board update as a key driver of CS efficiency gains.",
          attribution: "Sarah Chen, VP Customer Success",
          date: "Feb 21, 2026"
        },
        {
          type: "chat",
          context: "Support Lead describing how community content reduces ticket volume",
          quote: "We're seeing community answers resolve issues before they even become tickets. The knowledge base articles members write are sometimes better than our official docs.",
          attribution: "Mike Torres, Support Lead",
          date: "Feb 25, 2026"
        }
      ]
    }
  ]
};
