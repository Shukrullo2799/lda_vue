// services/userService.ts

export const userService = {
  async getUsers(params: any) {
    const { page, pageSize } = params

    // Fake total
    const total = 125

    // Fake items
    const items = Array.from({ length: pageSize }, (_, i) => {
      const id = (page - 1) * pageSize + i + 1
      return {
        id,
        name: `User ${id}`,
        email: `emaiil${id}.com`,
        role: ["Admin", "User", "Manager"],
      }
    })

    return Promise.resolve({
      data: {
        items,
        total,
      },
    })
  },
}
