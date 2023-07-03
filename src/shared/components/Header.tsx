import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 flex w-full justify-between bg-black-rich/40 p-4 px-7 font-work font-semibold text-primary-600 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Logo />
        <h1>Botanic Studio N1</h1>
      </div>
    </header>
  );
};
