/**
 * Berilgan permissionlardan kamida biri foydalanuvchida bormi — shuni tekshiradi
 * @param userPermissions Foydalanuvchidan kelgan permissionlar
 * @param requiredPermissions Tekshiriladigan permissionlar ro'yxati
 * @returns true | false
 */
export function hasAnyPermission(
  userPermissions: string[] | undefined | null,
  requiredPermissions: string[]
): boolean {
  if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
    return false;
  }

  const userSet = new Set(userPermissions);
  return requiredPermissions.some((perm) => userSet.has(perm));
}
