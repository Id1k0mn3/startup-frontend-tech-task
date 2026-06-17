import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'compact' | 'default' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	size?: ButtonSize
	variant?: ButtonVariant
}

const baseClassName = 'rounded-lg text-sm transition'

const variantClassNames: Record<ButtonVariant, string> = {
	danger: 'bg-red-700 text-white hover:bg-red-800',
	primary:
		'bg-blue-700 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300',
	secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
}

const sizeClassNames: Record<ButtonSize, string> = {
	compact: 'px-4 py-2 font-medium',
	default: 'px-5 py-2 font-medium',
	large: 'px-5 py-3 font-semibold'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className = '',
			size = 'compact',
			type = 'button',
			variant = 'primary',
			...buttonProps
		},
		ref
	) => (
		<button
			className={[
				baseClassName,
				sizeClassNames[size],
				variantClassNames[variant],
				className
			]
				.filter(Boolean)
				.join(' ')}
			ref={ref}
			type={type}
			{...buttonProps}
		>
			{children}
		</button>
	)
)

Button.displayName = 'Button'
