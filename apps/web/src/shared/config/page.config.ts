class PageConfig {
	readonly HOME = '/'

	readonly DASHBOARD = '/dashboard'

	readonly MEAL_PLANS = `${this.DASHBOARD}/meal-plans`
	readonly NUTRITION = `${this.DASHBOARD}/nutrition`
	readonly ANALYTICS = `${this.DASHBOARD}/analytics`
	readonly ORDER_GROCERIES = `${this.DASHBOARD}/order-groceries`
	readonly RECIPES = `${this.DASHBOARD}/recipes`
	readonly FORUM = `${this.DASHBOARD}/forum`

	private readonly AUTH = '/auth'
	readonly LOGIN = `${this.AUTH}/login`
	readonly REGISTER = `${this.AUTH}/register`
}

export const PAGES = new PageConfig()
