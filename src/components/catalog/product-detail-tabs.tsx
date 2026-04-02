"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
interface ProductDetailTabsProps {
  description: string;
  specs?: { label: string; values: string[] }[];
  printMethods?: string[];
  advantages?: string[];
}

export function ProductDetailTabs({
  description,
  specs,
  printMethods,
  advantages,
}: ProductDetailTabsProps) {
  return (
    <div className="mt-10">
      <Tabs defaultValue="beschrijving" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none gap-0">
          <TabsTrigger
            value="beschrijving"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground data-[state=active]:text-foreground"
          >
            Beschrijving
          </TabsTrigger>
          {specs && specs.length > 0 && (
            <TabsTrigger
              value="specificaties"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground data-[state=active]:text-foreground"
            >
              Aanvullende Info
            </TabsTrigger>
          )}
          {printMethods && printMethods.length > 0 && (
            <TabsTrigger
              value="bedrukking"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground data-[state=active]:text-foreground"
            >
              Bedrukking
            </TabsTrigger>
          )}
          <TabsTrigger
            value="bestellen"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground data-[state=active]:text-foreground"
          >
            Hoe Bestellen
          </TabsTrigger>
        </TabsList>

        {/* Tab: Beschrijving */}
        <TabsContent value="beschrijving" className="pt-6">
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
          {advantages && advantages.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Voordelen</h4>
              <ul className="space-y-2">
                {advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="h-4 w-4 mt-0.5 text-brand-green shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        {/* Tab: Specificaties (table-style like screenshot) */}
        {specs && specs.length > 0 && (
          <TabsContent value="specificaties" className="pt-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                      <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] align-top border-r">
                        {spec.label}
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {spec.values.length === 1 ? (
                          spec.values[0]
                        ) : (
                          <div className="space-y-1">
                            {spec.values.map((val, j) => (
                              <div key={j}>{j + 1}. {val}</div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        )}

        {/* Tab: Bedrukking */}
        {printMethods && printMethods.length > 0 && (
          <TabsContent value="bedrukking" className="pt-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] align-top border-r">
                      Logo Bedrukking
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        {printMethods.map((method, j) => (
                          <div key={j}>{j + 1}. {method}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Let op:</span> De best geschikte bedrukkingsmethode hangt af van uw ontwerp, gewenste kleuren en oplage. Ons team adviseert u graag over de ideale optie.
              </p>
            </div>
          </TabsContent>
        )}

        {/* Tab: Hoe Bestellen */}
        <TabsContent value="bestellen" className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Product Kiezen",
                  desc: "Selecteer het gewenste product en voeg het toe aan uw offerte-mandje. Geef het gewenste aantal en eventuele opmerkingen op.",
                },
                {
                  step: "2",
                  title: "Offerte Aanvragen",
                  desc: "Verstuur uw offerte-aanvraag via het formulier of WhatsApp. Ons team ontvangt uw verzoek direct.",
                },
                {
                  step: "3",
                  title: "Ontvang Uw Offerte",
                  desc: "Binnen 24 uur ontvangt u een gedetailleerde offerte met prijzen, levertijd en bedrukopties.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center p-5 border rounded-lg">
                  <div className="h-10 w-10 mx-auto rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="bg-muted/30">
                    <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] border-r">Levertijd</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">7-14 werkdagen na goedkeuring ontwerp</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] border-r">Verzending</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">Bezorging in heel Suriname, afhalen in Paramaribo mogelijk</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] border-r">Betaling</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">50% aanbetaling, 50% bij levering</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-sm font-medium text-foreground w-[180px] border-r">Ontwerp</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">Gratis ontwerp-assistentie bij elke bestelling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
