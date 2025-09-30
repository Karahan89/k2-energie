import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button-Komponente mit Style Guide 1.3.1 Tokens und WCAG 2.2 AA Konformität.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Button-Variante',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'md', 'lg', 'icon'],
      description: 'Button-Größe',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Button deaktiviert',
    },
    children: {
      control: { type: 'text' },
      description: 'Button-Text',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
}

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
    size: 'default',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'default',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'default',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'default',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Button-Größen von xs bis lg.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="destructive">Error</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Button-Zustände: Normal, Disabled, Error.',
      },
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </Button>
      <Button variant="outline">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons mit Icons für bessere Benutzerführung.',
      },
    },
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Focus Management</h3>
        <p className="text-sm text-gray-600 mb-4">
          Buttons haben sichtbare Focus-Indikatoren mit 3:1+ Kontrast (WCAG 1.4.11).
        </p>
        <Button>Focus mich (Tab drücken)</Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Keyboard Navigation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Alle Buttons sind über Tastatur erreichbar und haben Touch-Targets ≥ 44px.
        </p>
        <div className="flex gap-2">
          <Button size="xs">XS (44px+)</Button>
          <Button size="sm">SM (44px+)</Button>
          <Button size="default">Default (44px+)</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A11y-Features: Focus Management, Keyboard Navigation, Touch Targets.',
      },
    },
  },
}