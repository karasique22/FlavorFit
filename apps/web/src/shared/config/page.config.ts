class PageConfig {
	readonly HOME = '/'

	readonly DASHBOARD = '/dashboard'

	readonly PROFILE = `${this.DASHBOARD}/profile`
	readonly MEAL_PLANS = `${this.DASHBOARD}/meal-plans`
	readonly NUTRITION = `${this.DASHBOARD}/nutrition`
	readonly ANALYTICS = `${this.DASHBOARD}/analytics`
	readonly ORDER_GROCERIES = `${this.DASHBOARD}/order-groceries`
	readonly RECIPES = `${this.DASHBOARD}/recipes`
	readonly FORUM = `${this.DASHBOARD}/forum`

	private readonly AUTH = '/auth'
	readonly LOGIN = `${this.AUTH}/login`
	readonly REGISTER = `${this.AUTH}/register`
	readonly FORGOT_PASSWORD = `${this.AUTH}/forgot-password`
	readonly RESET_PASSWORD = `${this.AUTH}/reset-password`
}

export const PAGES = new PageConfig()
