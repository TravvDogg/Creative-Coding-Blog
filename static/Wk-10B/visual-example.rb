require 'ruby2d'

set title: "Ruby Visual Demo", width: 400, height: 300

# Draw a background
Rectangle.new(
  x: 0, y: 0,
  width: 400, height: 300,
  color: 'navy'
)

# Draw a moving shape
circle = Circle.new(
  x: -30, y: 150,
  radius: 30,
  sectors: 32,
  color: '#DC143C'
)

# Animate it
update do
  circle.x += 1
  circle.x = -circle.radius if circle.x > (Window.width + circle.radius)
end

show