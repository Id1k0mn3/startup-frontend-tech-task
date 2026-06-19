import { type ReactNode, type Ref } from 'react'

type DialogRole = 'dialog' | 'alertdialog'

interface DialogProps {
	ariaDescribedBy?: string
	ariaLabelledBy: string
	children: ReactNode
	overlayContent?: ReactNode
	overlayClassName: string
	panelClassName: string
	role: DialogRole
	rootRef?: Ref<HTMLDivElement>
}

const overlayBaseClassName = 'fixed inset-0 justify-center p-4'
const panelBaseClassName = 'rounded-2xl bg-white shadow-2xl'

export const Dialog = ({
	ariaDescribedBy,
	ariaLabelledBy,
	children,
	overlayContent,
	overlayClassName,
	panelClassName,
	role,
	rootRef
}: DialogProps) => (
	<div
		aria-describedby={ariaDescribedBy}
		aria-labelledby={ariaLabelledBy}
		aria-modal="true"
		className={`${overlayBaseClassName} ${overlayClassName}`}
		ref={rootRef}
		role={role}
	>
		<section className={`${panelBaseClassName} ${panelClassName}`}>
			{children}
		</section>
		{overlayContent}
	</div>
)
