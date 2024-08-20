"use client";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import mdxComponents from "@/components/mdxComponents";
const sourcesaple = `# Introduction to Motion

Motion is a fundamental concept in physics that describes the change in position of an object over time. In this module, we will explore the intricacies of simple harmonic motion, a specific type of periodic motion characterized by its oscillatory nature. Understanding motion is crucial for grasping more complex physical phenomena and applying these principles in real-world scenarios.

![Image](https://imageio.forbes.com/specials-images/imageserve/623342a53b13713b856e9434/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds)

## Section 1: Understanding Simple Harmonic Motion

Simple harmonic motion (SHM) occurs when an object moves back and forth around an equilibrium position. This motion can be described mathematically, and its characteristics include amplitude, frequency, and period. SHM is fundamental in various fields such as engineering, music, and even in the analysis of waves.

To visualize this concept, we can observe the motion of a pendulum or a mass on a spring, both of which exhibit SHM. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/4FGwgN6us70" title="Motion" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Section 2: The Mathematical Description of Motion

The mathematical equations governing simple harmonic motion are essential for predicting the behavior of oscillating systems. The position of an object in SHM can be expressed as a function of time, often using sine or cosine functions. The key parameters include:

- **Amplitude (A)**: The maximum displacement from the equilibrium position.
- **Angular frequency (ω)**: Related to the frequency of the motion and given by the formula ω = 2πf, where f is the frequency.
- **Phase constant (φ)**: Determines the initial position of the object at time t=0.

Understanding these equations allows for deeper insights into how systems respond to forces and energy.

<iframe width="560" height="315" src="https://www.youtube.com/embed/86S2LOA3EXA" title="BLACK Pink LEGO FOOD!!!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Section 3: The Energy in Simple Harmonic Motion

In simple harmonic motion, energy oscillates between kinetic and potential forms. At the maximum displacement, potential energy is at its peak while kinetic energy is zero. Conversely, at the equilibrium position, kinetic energy is maximized while potential energy is zero. This interplay of energy forms is critical in understanding how oscillations occur and can be analyzed through energy conservation principles.

![Image](https://blogassets.leverageedu.com/media/uploads/2023/12/18172451/types-of-motion.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/FoVBlH_1q_M" title="Slow motion look at the overtime finish, crash at Richmond | NASCAR" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Section 4: Real-World Applications of Motion

Simple harmonic motion is not just a theoretical construct; it has numerous applications in real-world scenarios. From the design of musical instruments to the analysis of seismic waves, SHM principles are utilized across various disciplines. Engineers use these concepts to create stable structures, while musicians rely on them to produce harmonious sounds.

![Image](https://www.thescienceacademy.sg/wp-content/uploads/2021/02/Physics-Forces-Graphic-900x600.jpg)

<iframe width="560" height="315" src="https://www.youtube.com/embed/QaAbxc8vStU" title="Perpetual Motion | The Fixies" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Conclusion

In conclusion, understanding simple harmonic motion provides a foundational insight into the principles of physics that govern the world around us. We have explored the characteristics, mathematical descriptions, energy transformations, and real-world applications of motion. This knowledge serves as a stepping stone for further studies in physics and engineering, where the principles of motion play a crucial role in innovation and discovery.`;

const LessonModule = () => {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const savedMdxContent = localStorage.getItem("mdxContent") || "";

    async function fetchMdxContent() {
      setMdxSource(
        savedMdxContent
          ? JSON.parse(savedMdxContent)
          : await serialize(sourcesaple)
      );
    }
    fetchMdxContent();
  }, []);
  //   const Component = useMDXComponent();

  return (
    <div className="max-w-3xl mx-auto px-4">
      {mdxSource ? (
        <MDXRemote {...mdxSource} components={mdxComponents} />
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default LessonModule;
