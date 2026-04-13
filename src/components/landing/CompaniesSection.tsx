import { motion } from "framer-motion";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Apple",
  "Uber",
  "Airbnb",
  "Stripe",
  "Spotify"
];

const CompaniesSection = () => {
  return (
    <section id="companies" className="py-20 bg-background overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
          Top Companies Hiring From Us
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our students have cracked placements at the world's most innovative tech companies.
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex bg-background/50 py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[100px] before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[100px] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
        <motion.div
          className="flex whitespace-nowrap gap-8 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Double the array for seamless infinite loop */}
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="px-8 py-6 text-xl md:text-2xl font-heading font-bold text-muted-foreground/60 bg-card rounded-xl border border-border/50 flex flex-col justify-center items-center shrink-0 min-w-[200px] shadow-sm hover:text-primary transition-colors duration-300"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesSection;
