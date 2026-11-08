using InventoryManagementSystem.Helpers;
using Xunit;

namespace InventoryManagementSystem.Tests
{
    public class PasswordHelperTests
    {
        [Fact]
        public void Hash_DoesNotContainThePlainPassword()
        {
            var hash = PasswordHelper.Hash("Admin@123");

            Assert.DoesNotContain("Admin@123", hash);
        }

        [Fact]
        public void Verify_ReturnsTrue_ForTheCorrectPassword()
        {
            var hash = PasswordHelper.Hash("Admin@123");

            Assert.True(PasswordHelper.Verify("Admin@123", hash));
        }

        [Fact]
        public void Verify_ReturnsFalse_ForAWrongPassword()
        {
            var hash = PasswordHelper.Hash("Admin@123");

            Assert.False(PasswordHelper.Verify("wrong-password", hash));
        }

        [Fact]
        public void Hash_GivesDifferentResults_ForTheSamePassword()
        {
            var first = PasswordHelper.Hash("Admin@123");
            var second = PasswordHelper.Hash("Admin@123");

            Assert.NotEqual(first, second);
        }
    }
}