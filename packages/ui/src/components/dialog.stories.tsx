import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { Button } from './button'
import { Input } from './input'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dialog-Komponente mit Style Guide 1.3.1 `<dialog>` Element und WCAG 2.2 AA Konformität.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'Dialog-Größe',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Dialog geöffnet',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Interactive Dialog Component for Stories
const InteractiveDialog = ({ size = 'default', ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Dialog öffnen
      </Button>
      <Dialog open={open} onOpenChange={setOpen} size={size} {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Titel</DialogTitle>
            <DialogDescription>
              Dies ist eine Beschreibung des Dialog-Inhalts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Dialog-Inhalt hier...</p>
            <Input placeholder="Eingabe im Dialog" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setOpen(false)}>
              Bestätigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <InteractiveDialog />,
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <InteractiveDialog size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <InteractiveDialog size="default" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <InteractiveDialog size="lg" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Extra Large</h3>
        <InteractiveDialog size="xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Full Screen</h3>
        <InteractiveDialog size="full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Verschiedene Dialog-Größen für verschiedene Anwendungsfälle.',
      },
    },
  },
}

const ContactFormExample = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Kontakt aufnehmen
      </Button>
      <Dialog open={open} onOpenChange={setOpen} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kontaktformular</DialogTitle>
            <DialogDescription>
              Füllen Sie das Formular aus und wir melden uns bei Ihnen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ihr Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                E-Mail *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ihre@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Nachricht *
              </label>
              <textarea
                id="message"
                className="w-full min-h-[100px] resize-none rounded-md border border-[color:var(--input-border)] p-3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ihre Nachricht..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setOpen(false)}>
              Nachricht senden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ContactForm: Story = {
  render: () => <ContactFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Praktisches Beispiel: Kontaktformular in einem Dialog.',
      },
    },
  },
}

const ConfirmationDialogExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Löschen
      </Button>
      <Dialog open={open} onOpenChange={setOpen} size="sm">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bestätigung erforderlich</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie dieses Element löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ConfirmationDialog: Story = {
  render: () => <ConfirmationDialogExample />,
  parameters: {
    docs: {
      description: {
        story: 'Bestätigungsdialog für kritische Aktionen.',
      },
    },
  },
}

const AccessibilityExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        A11y Dialog öffnen
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accessibility Features</DialogTitle>
            <DialogDescription>
              Dieser Dialog demonstriert die A11y-Features nach Style Guide 1.3.1.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Focus Management</h4>
              <p className="text-sm text-gray-600">
                • Focus wird automatisch auf den Dialog gesetzt<br/>
                • Focus ist im Dialog gefangen<br/>
                • Tab-Navigation funktioniert korrekt
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Keyboard Support</h4>
              <p className="text-sm text-gray-600">
                • ESC schließt den Dialog<br/>
                • Tab navigiert durch Elemente<br/>
                • Shift+Tab navigiert rückwärts
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Screen Reader</h4>
              <p className="text-sm text-gray-600">
                • aria-labelledby für Titel<br/>
                • aria-describedby für Beschreibung<br/>
                • Hintergrund wird inert gemacht
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Accessibility: Story = {
  render: () => <AccessibilityExample />,
  parameters: {
    docs: {
      description: {
        story: 'A11y-Features: Focus Management, Keyboard Support, Screen Reader Support.',
      },
    },
  },
}

const NativeDialogExample = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Native Dialog öffnen
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Native HTML Dialog</DialogTitle>
            <DialogDescription>
              Dieser Dialog verwendet das native HTML &lt;dialog&gt; Element.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Das native &lt;dialog&gt; Element bietet automatisch:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Focus Management</li>
              <li>ESC-Key Handling</li>
              <li>Inert Background</li>
              <li>Screen Reader Support</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Schließen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const NativeDialog: Story = {
  render: () => <NativeDialogExample />,
  parameters: {
    docs: {
      description: {
        story: 'Verwendung des nativen HTML &lt;dialog&gt; Elements nach Style Guide 1.3.1.',
      },
    },
  },
}