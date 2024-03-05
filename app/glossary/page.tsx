import Glossary from '@/app/ui/glossary/glossary';
import GlossaryNav from '@/app/ui/glossary/glossary-nav';

export default function Page() {
  return (
    <div className="flex px-4 py-6 text-slate-700">
      <div className="flex flex-col">
        <h3 className="flex text-center pb-4 text-5xl font-semibold">
          Ready to start making good data-driven choices?
        </h3>

        <p className="text-center">
          Digital marketing is a landscape in flux, that’s why we’ve created a
          mobile marketing glossary featuring must-know industry terms, topics,
          and concepts to help you keep up
        </p>
        <div className="flex">
          <GlossaryNav />
          <Glossary />
        </div>
      </div>
    </div>
  );
}