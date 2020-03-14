
export const Invited = {
  success(data: any, msg: String = ''): Object {
    return {
      success: true,
      message: msg,
      data
    }
  },
  fail(msg: String = '', failData: any = null): Object {
    return {
      success: false,
      message: msg,
      data: failData
    }
  }
}

export const getPageName = () => `page-${Math.random().toString(16).slice(2, 10)}.html`