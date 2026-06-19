import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text'
type ButtonSize = 'compact' | 'default' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	size?: ButtonSize
	variant?: ButtonVariant
}

const baseClassName =
	'inline-flex items-center justify-center text-center transition'

const variantClassNames: Record<ButtonVariant, string> = {
	danger: 'rounded-[16px] bg-red-700 px-5 py-3 text-white hover:bg-red-800',
	primary:
		'w-[184px] rounded-[16px] bg-app-orange px-[26px] py-6 text-[16px] width-(184px) font-semibold leading-none text-app-white hover:bg-app-orange/90 disabled:cursor-not-allowed disabled:bg-app-light-gray',
	secondary:
		'rounded-[16px] border border-gray-300 bg-white px-5 py-2 text-gray-700 hover:bg-gray-50 width-(184px)',
	text: 'p-[0] border-b-[1px] border-app-base text-app-base hover:border-app-orange hover:text-app-orange disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400'
}

const sizeClassNames: Record<ButtonSize, string> = {
	compact: 'text-sm',
	default: 'text-sm',
	large: 'text-base'
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
