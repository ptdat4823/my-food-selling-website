import FadeInSection from "../ui/fade-in-section";
import CustomImage from "./custom-image";

const AboutFood2 = () => {
  return (
    <section className="h-screen px-8 pt-24 flex flex-row gap-2">
      <div className="w-1/2 flex flex-col gap-8 mt-24">
        <FadeInSection delay={600}>
          <h2 className="font-bold text-5xl">Maintaining Freshness at here</h2>
        </FadeInSection>
        <FadeInSection delay={800}>
          <p className="text-lg leading-9">
            Maintaining the freshness of our products is a top priority at Fresh
            Mart. Once the produce arrives at our store, it is promptly and
            carefully stored in state-of-the-art refrigeration systems designed
            to preserve its quality. Our staff continuously monitors temperature
            and humidity levels to ensure optimal conditions. Additionally, we
            follow strict hygiene and handling protocols to keep all items fresh
            and safe for consumption. From the moment our products arrive to the
            time they reach your shopping cart, we are committed to providing
            you with the freshest food possible.
          </p>
        </FadeInSection>
      </div>
      <div className="w-1/2 h-[600px] flex flex-row justify-end gap-8 whitespace-nowrap">
        <FadeInSection delay={200}>
          <CustomImage image="/images/about-food-3.jpg" className="mt-16" />
        </FadeInSection>
        <FadeInSection>
          <CustomImage image="/images/about-food-4.jpg" />
        </FadeInSection>
      </div>
    </section>
  );
};

export default AboutFood2;
