import { FileText, ClipboardList, Pill, NotebookPen } from "lucide-react"

export type FormType = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export const allForms: FormType[] = [
  {
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for treatments",
    icon: FileText,
  },
  {
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation",
    icon: ClipboardList,
  },
  {
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation form",
    icon: Pill,
  },
  {
    title: "Progress Note",
    description: "Patient progress assessment and documentation",
    icon: NotebookPen,
  },
];
