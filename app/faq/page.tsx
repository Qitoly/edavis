import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getAllFaqs } from "@/lib/faq"

export const metadata: Metadata = {
  title: "FAQ - E-Davis",
  description: "Часто задаваемые вопросы",
}

export const dynamic = "force-dynamic"

export default async function FaqPage() {
  const faqs = await getAllFaqs()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
