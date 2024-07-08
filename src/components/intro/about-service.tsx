import FadeInSection from "../ui/fade-in-section";
import CustomImage from "./custom-image";

const AboutService = () => {
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
          <h1 className="font-extrabold text-4xl text-primary mb-4">
            About our delivery service
          </h1>
        </FadeInSection>
        <FadeInSection delay={1000}>
          <h2 className="font-bold text-5xl">
            We will bring to you a Reliable Delivery Service
          </h2>
        </FadeInSection>
        <FadeInSection delay={1200}>
          <p className="text-lg leading-9">
            Our delivery service at Fresh Mart is designed with your convenience
            in mind. We ensure that your orders are handled with the utmost care
            and delivered promptly to your doorstep. Our user-friendly online
            ordering system allows you to easily select your favorite items, and
            our efficient delivery team guarantees that your groceries arrive
            fresh and on time. Whether you&#39;re planning a family meal or need
            a quick restock, you can trust Fresh Mart to bring quality and
            freshness directly to you.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AboutService;
