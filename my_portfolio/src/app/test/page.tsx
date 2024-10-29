import Header from "@/components/header";
import ContributionHeatmap from "@/components/contributionHeatmap";

const Test = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <ContributionHeatmap />
      </div>
    </div>
  );
};

export default Test;
