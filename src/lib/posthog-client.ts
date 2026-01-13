let posthog: any = null

export const initPostHog = async (apiKey: string) => {
  if (typeof window !== 'undefined' && !posthog) {
    const posthogModule = await import('posthog-js')
    posthog = posthogModule.default
    posthog.init(apiKey, {
      api_host: 'https://app.posthog.com',
      capture_pageview: false
    })
  }
}

export const pageView = (page: string) => {
  posthog?.capture('page_view', { page })
}

export const trackEvent = (event: string, props: any) => {
  posthog?.capture(event, props)
}
