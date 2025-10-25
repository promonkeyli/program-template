// internal/pkg/middleware/jwt.go: jwt健鉴权间件
package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"web_backend.com/m/v2/tools"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		// Check if the token is provided and starts with "Bearer "
		if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing or malformed token"})
			c.Abort()
			return
		}

		// Remove "Bearer " prefix from the token
		tokenString = tokenString[7:]

		// Parse the token and get the claims
		claims, err := tools.ParseToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			c.Abort()
			return
		}

		// Store the username in the context for later use
		c.Set("username", claims.Username)
		c.Next()
	}
}
