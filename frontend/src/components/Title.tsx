interface TitleProps {
  text1: string;
  text2?: string;
  className?: string;
}

const Title = ({ text1, text2, className = "" }: TitleProps) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <p className="text-[12px] uppercase tracking-[0.22em] text-stone-500">
      {text1} {text2 && <span className="font-semibold text-stone-900">{text2}</span>}
    </p>
    <span className="h-px w-10 bg-stone-900" />
  </div>
);

export default Title;
