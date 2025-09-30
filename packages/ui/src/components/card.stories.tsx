import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card-Komponente mit Style Guide 1.3.1 Tokens und verschiedenen Varianten.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'ghost'],
      description: 'Card-Variante',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'default', 'lg'],
      description: 'Card-Padding',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default" className="w-72">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard Card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Standard Card mit normalem Shadow.</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated" className="w-72">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Erhöhte Card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card mit erhöhtem Shadow für mehr Tiefe.</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined" className="w-72">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Umrandete Card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card mit starker Umrandung.</p>
        </CardContent>
      </Card>
      
      <Card variant="ghost" className="w-72">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
          <CardDescription>Transparente Card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card ohne Shadow und Border.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Card-Varianten für verschiedene Anwendungsfälle.',
      },
    },
  },
}

export const PaddingSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="none" className="w-72">
        <CardHeader>
          <CardTitle>No Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card ohne Padding.</p>
        </CardContent>
      </Card>
      
      <Card padding="sm" className="w-72">
        <CardHeader>
          <CardTitle>Small Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card mit kleinem Padding.</p>
        </CardContent>
      </Card>
      
      <Card padding="default" className="w-72">
        <CardHeader>
          <CardTitle>Default Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card mit Standard-Padding.</p>
        </CardContent>
      </Card>
      
      <Card padding="lg" className="w-72">
        <CardHeader>
          <CardTitle>Large Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card mit großem Padding.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Padding-Größen für verschiedene Layout-Anforderungen.',
      },
    },
  },
}

export const WithContent: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Energieberatung</CardTitle>
        <CardDescription>
          Professionelle Beratung für Ihr Zuhause
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Unsere Leistungen:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Energieeffizienz-Analyse</li>
            <li>Förderberatung</li>
            <li>Sanierungsempfehlungen</li>
            <li>CO₂-Bilanzierung</li>
          </ul>
        </div>
        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Kostenlos:</strong> Erstberatung für Privatkunden
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button>Termin vereinbaren</Button>
        <Button variant="outline">Mehr erfahren</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card mit reichem Inhalt und verschiedenen Elementen.',
      },
    },
  },
}

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="w-80 hover:shadow-elevated transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>Hover Effect</CardTitle>
          <CardDescription>Card mit Hover-Effekt</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bewegen Sie die Maus über diese Card.</p>
        </CardContent>
      </Card>
      
      <Card className="w-80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
        <CardHeader>
          <CardTitle>Focus Management</CardTitle>
          <CardDescription>Card mit Focus-Indikator</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Tab drücken für Focus-Indikator.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interaktive Cards mit Hover- und Focus-Effekten.',
      },
    },
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Semantic Structure</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cards verwenden semantische HTML-Elemente für bessere Screen Reader-Unterstützung.
        </p>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Semantic Card</CardTitle>
            <CardDescription>Mit korrekter HTML-Struktur</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Diese Card verwendet h3, p und section Elemente.</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Focus Management</h3>
        <p className="text-sm text-gray-600 mb-4">
          Cards können fokussiert werden und haben sichtbare Focus-Indikatoren.
        </p>
        <Card 
          className="w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          tabIndex={0}
        >
          <CardHeader>
            <CardTitle>Focusable Card</CardTitle>
            <CardDescription>Tab drücken zum Fokussieren</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Diese Card kann fokussiert werden.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A11y-Features: Semantic Structure, Focus Management.',
      },
    },
  },
}