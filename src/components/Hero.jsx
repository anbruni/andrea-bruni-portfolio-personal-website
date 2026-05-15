import Button from './Button';
import AnimatedRoles from './AnimatedRoles';

function Hero({ onScrollToAbout }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <h1 className="heading-1 max-w-2xl">
                Hey, I am Andrea Bruni, <br />
                <span className="whitespace-nowrap">
                    a <AnimatedRoles />
                </span>
            </h1>

            <Button variant="primary" className="mt-8">
                Download CV
            </Button>
            <Button variant="secondary" className="mt-8" onClick={onScrollToAbout}>
                About Me
            </Button>
        </div>
    );
}

export default Hero;
