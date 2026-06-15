package utils

func IsPointInsidePolygon(lat float64, lng float64, polygon [][]float64) bool {

	inside := false

	j := len(polygon) - 1

	for i := 0; i < len(polygon); i++ {

		xi := polygon[i][0]
		yi := polygon[i][1]

		xj := polygon[j][0]
		yj := polygon[j][1]

		intersect :=
			((yi > lng) != (yj > lng)) &&
				(lat < (xj-xi)*(lng-yi)/(yj-yi)+xi)

		if intersect {
			inside = !inside
		}

		j = i
	}

	return inside
}
