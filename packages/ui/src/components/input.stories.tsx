import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input-Komponente mit Style Guide 1.3.1 Tokens und WCAG 2.2 AA Konformität.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Input-Variante',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Input-Größe',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input-Typ',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder-Text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Input deaktiviert',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error-Zustand',
    },
    success: {
      control: { type: 'boolean' },
      description: 'Success-Zustand',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Hilfstext',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Fehlermeldung',
    },
    successMessage: {
      control: { type: 'text' },
      description: 'Erfolgsmeldung',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Eingabe hier...',
    type: 'text',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="input-with-label" className="text-sm font-medium">
        Name
      </label>
      <Input
        id="input-with-label"
        placeholder="Ihr Name"
        type="text"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input mit Label für bessere A11y.',
      },
    },
  },
}

export const WithHelperText: Story = {
  args: {
    id: 'input-helper',
    placeholder: 'E-Mail-Adresse',
    type: 'email',
    helperText: 'Wir teilen Ihre E-Mail-Adresse niemals mit Dritten.',
  },
}

export const ErrorState: Story = {
  args: {
    id: 'input-error',
    placeholder: 'E-Mail-Adresse',
    type: 'email',
    error: true,
    errorMessage: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  },
}

export const SuccessState: Story = {
  args: {
    id: 'input-success',
    placeholder: 'E-Mail-Adresse',
    type: 'email',
    success: true,
    successMessage: 'E-Mail-Adresse ist gültig.',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Small</label>
        <Input size="sm" placeholder="Small input" />
      </div>
      <div>
        <label className="text-sm font-medium">Default</label>
        <Input size="default" placeholder="Default input" />
      </div>
      <div>
        <label className="text-sm font-medium">Large</label>
        <Input size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Input-Größen.',
      },
    },
  },
}

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Text</label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <Input type="password" placeholder="Password" />
      </div>
      <div>
        <label className="text-sm font-medium">Tel</label>
        <Input type="tel" placeholder="+49 123 456789" />
      </div>
      <div>
        <label className="text-sm font-medium">URL</label>
        <Input type="url" placeholder="https://example.com" />
      </div>
      <div>
        <label className="text-sm font-medium">Search</label>
        <Input type="search" placeholder="Suchen..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Input-Typen für verschiedene Datentypen.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Deaktiviert',
    disabled: true,
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Focus Management</h3>
        <p className="text-sm text-gray-600 mb-4">
          Inputs haben sichtbare Focus-Indikatoren mit 3:1+ Kontrast (WCAG 1.4.11).
        </p>
        <Input placeholder="Focus mich (Tab drücken)" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Error Handling</h3>
        <p className="text-sm text-gray-600 mb-4">
          Fehler werden mit aria-invalid und role=&quot;alert&quot; angezeigt.
        </p>
        <Input
          id="a11y-error"
          placeholder="Ungültige Eingabe"
          error={true}
          errorMessage="Dieses Feld ist erforderlich."
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Associations</h3>
        <p className="text-sm text-gray-600 mb-4">
          Labels und Hilfstexte sind korrekt mit aria-describedby verknüpft.
        </p>
        <div className="space-y-2">
          <label htmlFor="a11y-associated" className="text-sm font-medium">
            E-Mail-Adresse
          </label>
          <Input
            id="a11y-associated"
            type="email"
            placeholder="email@example.com"
            helperText="Wir teilen Ihre E-Mail-Adresse niemals mit Dritten."
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A11y-Features: Focus Management, Error Handling, Label Associations.',
      },
    },
  },
}