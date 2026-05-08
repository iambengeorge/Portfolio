import svgPaths from "./svg-xe09dfm2vu";

function Paragraph() {
  return (
    <div className="h-[14px] relative shrink-0 w-[84px]" data-name="Paragraph">
      <p className="absolute font-['IBM_Plex_Mono:SemiBold',sans-serif] leading-[14px] left-0 not-italic text-[#121413] text-[14px] top-0 uppercase whitespace-nowrap">Ben George</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow Left">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-[calc(50%-0.13px)] top-1/2 w-[12.25px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 10">
              <path d={svgPaths.p40a2d80} fill="var(--fill-0, #121413)" id="Shape" />
            </svg>
          </div>
        </div>
        <Paragraph />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['IBM_Plex_Mono:Medium',sans-serif] leading-[12px] not-italic relative shrink-0 text-[#121413] text-[12px] tracking-[0.96px] uppercase whitespace-nowrap">Kochi_[ist]</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Paragraph1 />
        <p className="font-['IBM_Plex_Mono:Medium',sans-serif] h-[12px] leading-[12px] not-italic relative shrink-0 text-[#121413] text-[12px] tracking-[0.96px] uppercase w-[8px]">|</p>
        <p className="font-['IBM_Plex_Mono:Medium',sans-serif] h-[12px] leading-[12px] not-italic relative shrink-0 text-[#121413] text-[12px] tracking-[0.96px] uppercase w-[57px]">1:48 PM</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] h-[14px] items-center relative shrink-0" data-name="Container">
      <Frame />
      <Container2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p2efcd300} id="Vector" stroke="var(--stroke-0, #121413)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function ButtonToggleDarkMode() {
  return (
    <div className="h-[24px] relative rounded-[4px] shrink-0 w-[32px]" data-name="Button - Toggle dark mode">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[8px] relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function NavLink() {
  return (
    <div className="h-[20px] relative rounded-[4px] shrink-0 w-[64.969px]" data-name="NavLink">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['IBM_Plex_Mono:Medium',sans-serif] leading-[12px] left-[8px] not-italic text-[#121413] text-[12px] top-[4px] tracking-[0.96px] uppercase whitespace-nowrap">Resume</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[26px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <NavLink />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#121413] h-[26px] relative rounded-[4px] shrink-0 w-[56.813px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['IBM_Plex_Mono:Medium',sans-serif] leading-[18px] left-[28px] not-italic text-[#f7f8f7] text-[12px] text-center top-[4px] tracking-[0.96px] uppercase whitespace-nowrap">Email</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[12px] h-[26px] items-center justify-end relative shrink-0 w-[315.547px]" data-name="Container">
      <ButtonToggleDarkMode />
      <Container5 />
      <Button />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-between py-[16px] relative shrink-0 w-[940px]" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function Navbar1() {
  return (
    <div className="absolute bg-[#edefee] content-stretch flex items-start justify-center left-0 top-0 w-[1456px]" data-name="Navbar">
      <Container />
    </div>
  );
}

export default function Navbar() {
  return (
    <div className="relative size-full" data-name="Navbar">
      <Navbar1 />
    </div>
  );
}