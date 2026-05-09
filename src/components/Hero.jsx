function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* Headline temporanea */}
      <h1 className="heading-1">
        Hey, I am Andrea Bruni, <br />
        a Campaign Specialist
      </h1>
      
      {/* Button temporaneo */}
      <button className="btn-primary mt-8">
        Download CV
      </button>
    </div>
  );
}

export default Hero;