import FadeInSection from "../ui/fade-in-section";
import CustomImage from "./custom-image";

const AboutServiceAfterSale = () => {
  return (
    <section className="h-screen px-8 pt-24 flex flex-row gap-2">
      <div className="w-1/2 flex flex-col gap-8 mt-24">
        <FadeInSection delay={600}>
          <h2 className="font-bold text-5xl">
            Hassle-Free After-Sales Service
          </h2>
        </FadeInSection>
        <FadeInSection delay={800}>
          <p className="text-lg leading-9">
            At Fresh Mart, we believe in providing exceptional service even
            after your purchase. If you&#39;re not completely satisfied with any
            item, our hassle-free refund and exchange policy is here to help.
            Simply contact our customer service team, and we&#39;ll promptly
            address your concerns, whether it&#39;s a product replacement or a
            full refund. Your satisfaction is our priority, and we&#39;re
            committed to ensuring you have a positive shopping experience from
            start to finish.
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

export default AboutServiceAfterSale;
