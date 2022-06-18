package app

import (
	"os"

	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"marcel.works/annaquiz/app/handler"
)

type app struct {
}

type App interface {
	Run()
}

func NewApp() App {
	return &app{}
}

func (a *app) Run() {
	router := echo.New()
	router.Use(middleware.CORS())
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())
	apiHandler := handler.NewHandler()
	router.Static("/", "ui/build")
	router.POST("/api/quiz", apiHandler.NewQuiz)
	router.GET("/api/quiz", apiHandler.GetQuizzes)
	router.GET("/api/quiz/:uuid", apiHandler.GetQuiz)
	router.POST("/api/quiz/:uuid/answers", apiHandler.NewAnswers)
	router.GET("/api/quiz/:uuid/answers", apiHandler.GetAnswers)
	router.GET("/api/quiz/:uuid/random", apiHandler.GetRandomAnswers)
	if os.Getenv("ENV") == "LIVE" {
		prom := prometheus.NewPrometheus("annaquiz", nil)
		prom.Use(router)
	}
	router.Start(":8001")
}
