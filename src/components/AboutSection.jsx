
function AboutSection({ ref }) {

    return (
        <div ref={ref} className="relative w-full">
            {/* Content */}
            <div className="min-h-screen px-6 md:px-16 py-24 relative z-10 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-lg">
                    <h1 className="heading-1 mb-4">About Me</h1>
                    <p className="subtitle mb-6">I'm Andrea Bruni, a passionate Frontend Developer with a love for crafting beautiful and functional web experiences. With a background in design and a keen eye for detail, I specialize in creating responsive and user-friendly interfaces that delight users.</p>
                    <p className="subtitle mb-6">I have experience working with modern frontend technologies such as React, Vue, and Angular, and I'm always eager to learn new tools and frameworks to stay at the forefront of web development. My goal is to build websites and applications that not only look great but also provide seamless user experiences.</p>
                    <p className="subtitle">When I'm not coding, you can find me exploring the latest design trends, contributing to open-source projects, or enjoying a good book on web development. I'm always open to new opportunities and collaborations, so feel free to reach out!</p>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;