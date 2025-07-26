	package dp

	func IsMatch(s string, p string) bool {
		slength, plength := len(s), len(p)
		dp := make([][]bool, slength+1)
		for i := range dp{
			dp[i] = make([]bool, plength+1)
		}
		dp[0][0] = true

		for i := 0; i < plength; i++ {
			if p[i] == '*' && dp[0][i-1]{
				dp[0][i+1] = true
			}
		}

		for i := 0; i < slength; i++ {
			for j := 0; j < plength; j++ {
				if p[j] == '.' {
					dp[i+1][j+1] = dp[i][j]
				}
				if p[j] == s[i] {
					dp[i+1][j+1] = dp[i][j]
				}
				if p[j] == '*' {
					if p[j-1] != s[i] && p[j-1] != '.' {
						dp[i+1][j+1] = dp[i+1][j-1]
					}else {
						dp[i+1][j+1] = dp[i+1][j] || dp[i][j+1] || dp[i+1][j-1]
					}
				}
			}
		}

		return dp[slength][plength]
	}