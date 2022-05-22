import * as yup from 'yup'

yup.addMethod(yup.string, 'integer', function (name) {
	return this.matches(/^\d+$/, name)
})

yup.addMethod(yup.array, 'selectMulti', function (...args) {
	return this.test(
		'select_multi_required',
		'Elige una opción',
		item => item.length > 0
	)
})

export const numberValidation = yup
	.number()
	.transform(function (value, originalValue) {
		if (this.isType(value)) return value
		if (!originalValue || !originalValue.trim()) {
			return null
		}
		return originalValue
	})
	.nullable(true)
	.typeError('Debe ser un número')
	.positive('Debe ser un número positivo')

export const numberValidationPositiveWithZero = yup
	.number()
	.transform(function (value, originalValue) {
		if (this.isType(value)) return value
		if (!originalValue || !originalValue.trim()) {
			return null
		}
		return originalValue
	})
	.nullable(true)
	.typeError('Debe ser un número')
	.moreThan(-1, 'No puede ser un número negativo')

yup.setLocale({
	mixed: {
		required: 'El campo es obligatorio',
		typeError: 'El campo es obligatorio'
	},
	string: {
		email: 'El email no es correcto',
		min: '${min} caracteres como mínimo'
	}
})

export default yup
