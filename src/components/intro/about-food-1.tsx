import FadeInSection from "../ui/fade-in-section";
import CustomImage from "./custom-image";

const AboutFood1 = () => {
  return (
    <section className="h-screen px-8 pt-24 flex flex-row gap-2">
      <div className="w-1/2 h-[600px] flex flex-row gap-8 whitespace-nowrap">
        <FadeInSection>
          <CustomImage image="/images/about-food-1.jpg" />
        </FadeInSection>
        <FadeInSection delay={200}>
          <CustomImage image="/images/about-food-2.jpg" className="mt-16" />
        </FadeInSection>
      </div>
      <div className="w-1/2 flex flex-col gap-8 justify-start mt-24">
        <FadeInSection delay={600}>
          <h1 className="font-extrabold text-4xl text-primary">
            About our food
          </h1>
        </FadeInSection>
        <FadeInSection delay={1000}>
          <h2 className="font-bold text-5xl">From Farm to Our Mart</h2>
        </FadeInSection>
        <FadeInSection delay={1200}>
          <p className="text-lg leading-9">
            At Fresh Mart, we prioritize the journey of your food from farm to
            store. We partner with local farmers and suppliers to ensure that
            only the freshest produce and highest-quality ingredients make it to
            our shelves. Our dedicated team inspects and selects the best
            products at the source, ensuring that they are harvested at the peak
            of ripeness. This rigorous process guarantees that every item you
            find at Fresh Mart is fresh, nutritious, and ready to enhance your
            meals.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AboutFood1;
