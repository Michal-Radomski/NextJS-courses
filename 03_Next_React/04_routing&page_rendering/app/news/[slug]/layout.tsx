export default function NewsDetailLayout({ children, modal }: { children: JSX.Element; modal: JSX.Element }): JSX.Element {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
