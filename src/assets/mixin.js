export default {
    methods: {
        styleBackground(colors, gradientDirection) {
            const colorsString = (colorsArr) => {
                return [...colorsArr].join(",")
            }

            const gradientString = (direction) => {
                const gradientOptions = {
                    Horizontal: "to right",
                    Vertical: "to bottom",
                    Diagonal: "to right bottom",
                }

                return (
                    gradientOptions[direction] ?? "to right bottom"
                )
            }

            return {
                background:
                    colors.length > 1
                        ? [
                            colors[0],
                            `-webkit-linear-gradient(${gradientString(gradientDirection)},${colorsString(colors)})`,
                            `linear-gradient(${gradientString(gradientDirection)},${colorsString(colors)})`,
                        ]
                        : colors[0],
                height: "100%",
                width: " 100%",
            }
        },
    }
}
