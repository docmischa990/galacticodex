function Header () {
  return (
    <header className="sw-title text-center">
        <h1 
        className="
        font-starwars
        text-yellow-400
        text-6xl
        sm:text-5xl
        md:text-8xl
        tracking-[0.25em]
        sw-title
        "
          >
            <span className="block">Galactic</span>
            
            
        <p 
        className="
        font-roboto 
        font-bold
        mt-4 
        text-4xl
        sw-subtitle
        text-slate-300
        "
        >
            {"archive of the galaxy".split("").map((char, i) => (
            <span key={i} className="sw-letter">
                {char === " " ? "\u00A0" : char}
            </span>
            ))}
            </p>
            <span className="block">Codex</span>
            </h1>
    </header>
  )
}

export default Header