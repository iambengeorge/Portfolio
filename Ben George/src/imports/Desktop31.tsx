function Frame2() {
  return (
    <div className="content-stretch flex font-['IBM_plex_Mono:Regular',sans-serif] gap-[4px] items-center leading-[1.2] relative shrink-0 text-[11px] tracking-[0.66px]">
      <p className="relative shrink-0">Kochi_[ist]</p>
      <p className="relative shrink-0">|</p>
      <p className="relative shrink-0">5:51 PM</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[16px] items-center not-italic relative shrink-0 text-[#d1d5d3] uppercase whitespace-nowrap">
      <p className="font-['IBM_Plex_Mono:SemiBold',sans-serif] leading-none relative shrink-0 text-[14px]">Ben George</p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['IBM_plex_Mono:Medium',sans-serif] gap-[24px] items-center leading-none not-italic relative shrink-0 text-[#d1d5d3] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">
      <p className="relative shrink-0">Work</p>
      <p className="relative shrink-0">Resume</p>
      <p className="relative shrink-0">Contact</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#d1d5d3] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#16241f] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">Email</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[940px]">
      <Frame5 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#191d1b] h-[60px] relative rounded-[6px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[32px] py-[16px] relative size-full">
          <Frame10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#2a2e2c] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">{`PRODUCT DESIGNER //`}</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 w-full" data-name="Hero">
      <p className="font-['PP_Neue_Montreal:Medium',sans-serif] leading-[1.05] relative shrink-0 text-[#d1d5d3] text-[95px] tracking-[-2.85px] w-full">I design software and the systems that scale it.</p>
      <p className="font-['PP_Neue_Montreal:Book',sans-serif] leading-[1.5] relative shrink-0 text-[#949a98] text-[18px] w-full">For the last 6 years, I’ve worked in high-speed startup environments, taking products from initial concept to market. I focus on measurable outcomes, work directly with engineering to respect technical constraints, and build systems meant to scale.</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame8 />
      <Hero />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#949a98] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">{`RECENT: LEAD PRODUCT DESIGNER @ omnipractice [5 YEARS, B2b SAAS & B2C mobile]`}</p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start overflow-clip relative shrink-0 w-[940px]" data-name="header">
      <Frame11 />
      <Frame7 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] overflow-clip relative shrink-0 w-full">
      <div className="col-1 justify-self-stretch relative rounded-[8px] row-1 self-stretch shrink-0" data-name="Signal Card">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="gap-x-[10px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] not-italic p-[32px] relative size-full">
            <p className="col-1 font-['IBM_Plex_Mono:Medium',sans-serif] justify-self-stretch leading-[1.2] relative row-1 self-start shrink-0 text-[#d1d5d3] text-[20px]">0 → 1</p>
            <p className="col-1 font-['PP_Neue_Montreal:Book',sans-serif] justify-self-stretch leading-[1.4] relative row-2 self-start shrink-0 text-[#949a98] text-[16px]">Experienced in 0-to-1 environments. I take raw, ambiguous requirements and translate them into structured, launch-ready software.</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2a2e2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Signal Card">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="gap-x-[10px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] not-italic p-[32px] relative size-full">
            <p className="col-1 font-['IBM_Plex_Mono:Medium',sans-serif] justify-self-stretch leading-[1.2] relative row-1 self-start shrink-0 text-[#d1d5d3] text-[20px]">Design systems</p>
            <p className="col-1 font-['PP_Neue_Montreal:Book',sans-serif] justify-self-stretch leading-[1.4] relative row-2 self-start shrink-0 text-[#949a98] text-[16px]">Built and managed core component libraries. I translate complex interface patterns into strict, reusable rules that speed up engineering.</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2a2e2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="col-1 justify-self-stretch relative rounded-[8px] row-2 self-stretch shrink-0" data-name="Signal Card">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="gap-x-[10px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] not-italic p-[32px] relative size-full">
            <p className="col-1 font-['IBM_Plex_Mono:Medium',sans-serif] justify-self-stretch leading-[1.2] relative row-1 self-start shrink-0 text-[#d1d5d3] text-[20px]">6</p>
            <p className="col-1 font-['PP_Neue_Montreal:Book',sans-serif] justify-self-stretch leading-[1.4] relative row-2 self-start shrink-0 text-[#949a98] text-[16px]">Six years in product design, including five continuous years at one startup. I build systems meant to scale, and I stay to maintain and evolve them.</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2a2e2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <div className="col-2 justify-self-stretch relative rounded-[8px] row-2 self-start shrink-0" data-name="Signal Card">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="gap-x-[10px] gap-y-[16px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] not-italic p-[32px] relative size-full">
            <p className="col-1 font-['IBM_Plex_Mono:Medium',sans-serif] justify-self-stretch leading-[1.2] relative row-1 self-start shrink-0 text-[#d1d5d3] text-[20px]">Distributed teams</p>
            <p className="col-1 font-['PP_Neue_Montreal:Book',sans-serif] justify-self-stretch leading-[1.4] relative row-2 self-start shrink-0 text-[#949a98] text-[16px]">Collaborated daily with remote engineering teams. I rely on clear, asynchronous documentation to keep cross-timezone projects on schedule.</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2a2e2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Mc() {
  return (
    <div className="content-stretch flex flex-col gap-[160px] items-start relative shrink-0 w-[940px]" data-name="MC">
      <Header />
      <Frame6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">{`work // cases`}</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[940px]" data-name="header">
      <Frame12 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">Omnipractice</p>
      <p className="font-['PP_Neue_Montreal:Medium',sans-serif] leading-[1.2] min-w-full relative shrink-0 text-[#d1d5d3] text-[32px] w-[min-content]">Designing for user activation against a massive 86% drop-off</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[32px] items-start justify-center justify-self-stretch not-italic relative row-1 self-start shrink-0">
      <Frame24 />
      <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[1.5] min-w-full relative shrink-0 text-[#949a98] text-[13px] tracking-[0.52px] uppercase w-[min-content]">Healthcare SaaS · b2b · Lead Designer · 5 weeks</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.2] not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">14 → 41%</p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">activation_rate</p>
    </div>
  );
}

function LMetric() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.2] not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">30 → 70%</p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">onb_completion</p>
    </div>
  );
}

function LMetric1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame16 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <LMetric />
      <LMetric1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-between justify-self-stretch relative row-1 self-stretch shrink-0">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6c7270] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">impact</p>
      <Frame25 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">Omnipractice</p>
      <p className="font-['PP_Neue_Montreal:Medium',sans-serif] leading-[1.2] min-w-full relative shrink-0 text-[#d1d5d3] text-[32px] w-[min-content]">Practice management SaaS for mental health clinics in the US</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[32px] items-start justify-center justify-self-stretch not-italic relative row-1 self-start shrink-0">
      <Frame27 />
      <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[1.5] min-w-full relative shrink-0 text-[#949a98] text-[13px] tracking-[0.52px] uppercase w-[min-content]">{`Healthcare SaaS · b2b & b2c· Lead Designer · 8 months`}</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.2] not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">35% decrease</p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">claim_rejections</p>
    </div>
  );
}

function LMetric2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame17 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] leading-[0] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">
        <span className="leading-[1.2]">100</span>
        <span className="leading-[1.2] text-[10.32px]">+</span>
        <span className="leading-[1.2]">{` components`}</span>
      </p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] leading-[1.2] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">design_system</p>
    </div>
  );
}

function LMetric3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame18 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <LMetric2 />
      <LMetric3 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-between justify-self-stretch relative row-1 self-stretch shrink-0">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6c7270] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">impact</p>
      <Frame29 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">fairsplits</p>
      <p className="font-['PP_Neue_Montreal:Medium',sans-serif] leading-[1.2] min-w-full relative shrink-0 text-[#d1d5d3] text-[32px] w-[min-content]">Lifestyle finance app for trips and hangouts</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[32px] items-start justify-center justify-self-stretch not-italic relative row-1 self-start shrink-0">
      <Frame31 />
      <p className="font-['IBM_Plex_Mono:Regular',sans-serif] leading-[1.5] min-w-full relative shrink-0 text-[#949a98] text-[13px] tracking-[0.52px] uppercase w-[min-content]">consumer app · Mobile · 0 → 1 · founding designer. 2025</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.2] not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">released</p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">app_store</p>
    </div>
  );
}

function LMetric4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.2] not-italic relative shrink-0 uppercase w-full">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] min-w-full relative shrink-0 text-[#d1d5d3] text-[16px] tracking-[-0.32px] w-[min-content]">released</p>
      <p className="font-['IBM_plex_Mono:Regular',sans-serif] relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] whitespace-nowrap">play_store</p>
    </div>
  );
}

function LMetric5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="L metric">
      <Frame20 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
      <LMetric4 />
      <LMetric5 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-between justify-self-stretch relative row-1 self-stretch shrink-0">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#6c7270] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">impact</p>
      <Frame33 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="relative shrink-0 w-full" data-name="Case Card">
        <div className="gap-x-[96px] gap-y-[56px] grid grid-cols-[___minmax(0,0.50fr)_minmax(0,4fr)_minmax(0,2fr)] grid-rows-[repeat(1,fit-content(100%))] overflow-clip py-[48px] relative rounded-[inherit] size-full">
          <p className="col-1 font-['Departure_Mono:Regular',sans-serif] justify-self-start leading-none not-italic relative row-1 self-start shrink-0 text-[#949a98] text-[40px] tracking-[0.8px] whitespace-nowrap">01</p>
          <Frame21 />
          <Frame22 />
        </div>
        <div aria-hidden="true" className="absolute border-[#3a403d] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="relative shrink-0 w-full" data-name="Case Card">
        <div className="gap-x-[96px] gap-y-[56px] grid grid-cols-[___minmax(0,0.50fr)_minmax(0,4fr)_minmax(0,2fr)] grid-rows-[repeat(1,fit-content(100%))] overflow-clip py-[48px] relative rounded-[inherit] size-full">
          <p className="col-1 font-['Departure_Mono:Regular',sans-serif] justify-self-start leading-none not-italic relative row-1 self-start shrink-0 text-[#949a98] text-[40px] tracking-[0.8px] whitespace-nowrap">02</p>
          <Frame26 />
          <Frame28 />
        </div>
        <div aria-hidden="true" className="absolute border-[#3a403d] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="relative shrink-0 w-full" data-name="Case Card">
        <div className="gap-x-[96px] gap-y-[56px] grid grid-cols-[___minmax(0,0.50fr)_minmax(0,4fr)_minmax(0,2fr)] grid-rows-[repeat(1,fit-content(100%))] overflow-clip py-[48px] relative rounded-[inherit] size-full">
          <p className="col-1 font-['Departure_Mono:Regular',sans-serif] justify-self-start leading-none not-italic relative row-1 self-start shrink-0 text-[#949a98] text-[40px] tracking-[0.8px] whitespace-nowrap">03</p>
          <Frame30 />
          <Frame32 />
        </div>
        <div aria-hidden="true" className="absolute border-[#3a403d] border-b border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Mc1() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-[940px]" data-name="MC">
      <Header1 />
      <Frame23 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_plex_Mono:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#949a98] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">{`contact //`}</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[940px]" data-name="header">
      <Frame13 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-name="Container">
      <div className="flex flex-col font-['IBM_plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] uppercase whitespace-nowrap">
        <p className="leading-[1.2]">EMAIL</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">↗</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">hello@bengeroge.in</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-name="Container">
      <div className="flex flex-col font-['IBM_plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] uppercase whitespace-nowrap">
        <p className="leading-[1.2]">linkedin</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">↗</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">linkedin.com/in/iambengeorge/</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Link2 />
      <Link3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-name="Container">
      <div className="flex flex-col font-['IBM_plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] uppercase whitespace-nowrap">
        <p className="leading-[1.2]">behance</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">↗</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">behance.net/ben_george</p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Link4 />
      <Link5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-name="Container">
      <div className="flex flex-col font-['IBM_plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#949a98] text-[11px] tracking-[0.66px] uppercase whitespace-nowrap">
        <p className="leading-[1.2]">medium</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">↗</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['IBM_Plex_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5d3] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">medium.com/@iambengeorge</p>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[13px] items-center relative shrink-0">
      <Link6 />
      <Link7 />
    </div>
  );
}

function Cards() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="CARDS">
      <div className="relative shrink-0 w-full" data-name="CONTACT CARD">
        <div className="content-stretch flex items-center overflow-clip py-[18px] relative rounded-[inherit] size-full">
          <Container />
          <Frame35 />
        </div>
        <div aria-hidden="true" className="absolute border-[#2a2e2c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="relative shrink-0 w-full" data-name="CONTACT CARD">
        <div className="content-stretch flex items-center overflow-clip py-[18px] relative rounded-[inherit] size-full">
          <Container1 />
          <Frame36 />
        </div>
        <div aria-hidden="true" className="absolute border-[#2a2e2c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="relative shrink-0 w-full" data-name="CONTACT CARD">
        <div className="content-stretch flex items-center overflow-clip py-[18px] relative rounded-[inherit] size-full">
          <Container2 />
          <Frame37 />
        </div>
        <div aria-hidden="true" className="absolute border-[#2a2e2c] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="relative shrink-0 w-full" data-name="CONTACT CARD">
        <div className="content-stretch flex items-center overflow-clip py-[18px] relative rounded-[inherit] size-full">
          <Container3 />
          <Frame38 />
        </div>
        <div aria-hidden="true" className="absolute border-[#2a2e2c] border-b border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="col-3 content-stretch flex items-center justify-center justify-self-end relative row-1 self-end shrink-0">
      <p className="font-['IBM_Plex_Mono:Medium',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#d1d5d3] text-[16px] uppercase whitespace-nowrap">[ download RESUME ↓ ]</p>
    </div>
  );
}

function CaseCard() {
  return (
    <div className="gap-x-[96px] gap-y-[56px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] overflow-clip relative shrink-0 w-full" data-name="Case Card">
      <Cards />
      <Frame39 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <CaseCard />
    </div>
  );
}

function Mc2() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-[940px]" data-name="MC">
      <Header2 />
      <Frame34 />
    </div>
  );
}

function LeftNodeCopyrightImmutableStringsPreserved() {
  return (
    <div className="content-stretch flex font-['IBM_Plex_Mono:Regular',sans-serif] items-start justify-between leading-[0] not-italic relative shrink-0 text-[#191d1b] text-[11px] tracking-[0.66px] uppercase w-full whitespace-nowrap" data-name="Left Node: Copyright (Immutable strings preserved)">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[16.5px]">© 2026 BEN GEORGE. ALL RIGHTS RESERVED.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[16.5px]">say hello@bengeorge.in</p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 p-[10px] top-[13.75px] w-[940px]">
      <LeftNodeCopyrightImmutableStringsPreserved />
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-[#d1d5d3] h-[64px] overflow-clip relative shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#121413] content-stretch flex flex-col gap-[160px] items-center relative size-full" data-name="Desktop - 31">
      <Frame />
      <Mc />
      <Mc1 />
      <Mc2 />
      <Frame40 />
    </div>
  );
}