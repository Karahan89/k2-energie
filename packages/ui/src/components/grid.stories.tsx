import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';

const meta: Meta = {
  title: 'Layout/Grid',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const cardMinStyle = (value: string) =>
  ({ '--card-min': value } as CSSProperties & { '--card-min': string });

// Beispiel-Karten für die Stories
const SampleCard = ({ title, content, variant = 'default' }: { 
  title: string; 
  content: string; 
  variant?: 'default' | 'outline' | 'secondary' 
}) => (
  <Card variant={variant} className="p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{content}</p>
  </Card>
);

export const CardsGrid: Story = {
  render: () => (
    <div className="grid-cards" style={cardMinStyle('280px')}>
      <SampleCard 
        title="Energieberatung" 
        content="Professionelle Beratung für Ihr Zuhause mit modernsten Technologien und nachhaltigen Lösungen." 
      />
      <SampleCard 
        title="Solaranlagen" 
        content="Individuelle Photovoltaik-Lösungen für maximale Energieeffizienz und Kosteneinsparungen." 
      />
      <SampleCard 
        title="Wärmepumpen" 
        content="Effiziente Heizungssysteme für umweltfreundliches und kostengünstiges Heizen." 
      />
      <SampleCard 
        title="Dämmung" 
        content="Optimale Wärmedämmung reduziert Heizkosten und steigert den Wohnkomfort erheblich." 
      />
      <SampleCard 
        title="Smart Home" 
        content="Intelligente Haussteuerung für maximale Energieeffizienz und Komfort." 
      />
      <SampleCard 
        title="Förderungen" 
        content="Wir helfen Ihnen bei der Beantragung aller verfügbaren Fördermittel und Zuschüsse." 
      />
    </div>
  ),
};

export const CardsGridNarrow: Story = {
  render: () => (
    <div className="grid-cards" style={cardMinStyle('200px')}>
      <SampleCard 
        title="Kurz" 
        content="Kurzer Text." 
      />
      <SampleCard 
        title="Mittel" 
        content="Dies ist ein mittellanger Text mit mehreren Wörtern und Sätzen." 
      />
      <SampleCard 
        title="Sehr langer Titel mit vielen Wörtern" 
        content="Dies ist ein sehr langer Text mit vielen Wörtern, der zeigen soll, wie sich das Grid bei unterschiedlichen Inhaltslängen verhält. Der Text sollte nicht zeichenweise umbrechen, sondern sinnvoll in Wörtern." 
      />
    </div>
  ),
};

export const LayoutGrid12: Story = {
  render: () => (
    <div className="layout-grid">
      <div className="span-6">
        <SampleCard title="Hauptinhalt (6 Spalten)" content="Dieser Bereich nimmt die Hälfte der verfügbaren Breite ein." />
      </div>
      <div className="span-3">
        <SampleCard title="Sidebar 1 (3 Spalten)" content="Kürzerer Inhalt." />
      </div>
      <div className="span-3">
        <SampleCard title="Sidebar 2 (3 Spalten)" content="Auch kürzer." />
      </div>
      <div className="span-4">
        <SampleCard title="Feature 1 (4 Spalten)" content="Ein Feature-Block." />
      </div>
      <div className="span-4">
        <SampleCard title="Feature 2 (4 Spalten)" content="Noch ein Feature." />
      </div>
      <div className="span-4">
        <SampleCard title="Feature 3 (4 Spalten)" content="Drittes Feature." />
      </div>
    </div>
  ),
};

export const LayoutGridResponsive: Story = {
  render: () => (
    <div className="layout-grid">
      <div className="span-12 md:span-6 lg:span-4">
        <SampleCard title="Responsive 1" content="12 Spalten auf Mobile, 6 auf Tablet, 4 auf Desktop." />
      </div>
      <div className="span-12 md:span-6 lg:span-4">
        <SampleCard title="Responsive 2" content="Gleiche Breakpoints wie oben." />
      </div>
      <div className="span-12 md:span-12 lg:span-4">
        <SampleCard title="Responsive 3" content="12 auf Mobile/Tablet, 4 auf Desktop." />
      </div>
    </div>
  ),
};

export const GridComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Karten-Grid (auto-fit)</h2>
        <div className="grid-cards" style={cardMinStyle('250px')}>
          <SampleCard title="Auto-Fit 1" content="Passt sich automatisch an." />
          <SampleCard title="Auto-Fit 2" content="Keine festen Spalten." />
          <SampleCard title="Auto-Fit 3" content="Responsive ohne Media Queries." />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">12-Spalten-Grid (manuell)</h2>
        <div className="layout-grid">
          <div className="span-4">
            <SampleCard title="Manuell 1" content="4 Spalten." />
          </div>
          <div className="span-4">
            <SampleCard title="Manuell 2" content="4 Spalten." />
          </div>
          <div className="span-4">
            <SampleCard title="Manuell 3" content="4 Spalten." />
          </div>
        </div>
      </div>
    </div>
  ),
};

