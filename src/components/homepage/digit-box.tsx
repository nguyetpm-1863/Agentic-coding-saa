interface DigitBoxProps {
  digit: string;
}

export default function DigitBox({ digit }: DigitBoxProps) {
  return (
    <div
      className="flex items-center justify-center w-[51px] h-[82px] md:w-[51px] md:h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E] backdrop-blur-[16.64px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 234, 158, 0.12) 0%, rgba(255, 234, 158, 0.04) 100%)",
      }}
    >
      <span
        className="text-white font-normal"
        style={{
          fontFamily: "var(--font-digital-numbers)",
          fontSize: "49px",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {digit}
      </span>
    </div>
  );
}
