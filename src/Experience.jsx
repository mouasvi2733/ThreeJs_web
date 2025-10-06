import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    
    // مرحله ۱: یک state برای نگهداری وضعیت فوکوس تعریف می‌کنیم
    const [ isFocused, setFocused ] = useState(false)

    // مرحله ۲: انیمیشن دوربین با استفاده از هوک useFrame
    // این هوک یک تابع را در هر فریم اجرا می‌کند
    useFrame((state) => 
    {
        // موقعیت هدف دوربین را بر اساس وضعیت فوکوس تعیین می‌کنیم
        const targetPosition = isFocused 
            ? new THREE.Vector3(0, 0.1, 2)  // موقعیت زوم شده (روبروی لپ‌تاپ)
            : new THREE.Vector3(-4, 1.8, 5); // موقعیت اولیه و پیش‌فرض
            state.camera.position.lerp(targetPosition, 0.01)
            state.camera.lookAt(0, 0, 0)

            const targetFov = isFocused ? 200 : 85;

        // استفاده از lerp برای حرکت نرم دوربین به سمت موقعیت هدف
        // عدد 0.1 سرعت انیمیشن را کنترل می‌کند (می‌توانید آن را تغییر دهید)
        state.camera.position.lerp(targetPosition, 0.01)

        // دوربین را وادار می‌کنیم همیشه به مرکز صحنه نگاه کند
        state.camera.lookAt(0, 0, 0)
    })
    
    return <>

        <color args={ [ '#63c5d5' ] } attach="background" />

        <Environment preset="city" />
        
        <PresentationControls
            global
            rotation={ [ 0.13, 0.1, 0 ] }
            polar={ [ - 0.3, 0.2 ] }
            azimuth={ [ - 1, 0.75 ] }
            config={ { mass: 2, tension: 400 } }
            snap={ { mass: 4, tension: 400 } }
        >
            <Float rotationIntensity={ 0.4 } >  
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#93b9d0ff' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />

                {/* مرحله ۳: اضافه کردن رویدادهای کلیک به مدل */}
                <primitive
                    object={ computer.scene }
                    position-y={ - 1.2 }
                    // وقتی روی مدل کلیک شد
                    onClick={ (event) => 
                    {
                        // از انتشار رویداد به دیگر اشیاء جلوگیری می‌کند
                        event.stopPropagation() 
                        setFocused(true) 
                    }}
                    // وقتی جایی غیر از مدل کلیک شد
                    onPointerMissed={ () => setFocused(false) }
                >
                    <Html
                        transform
                        wrapperClass="htmlScreen"
                        distanceFactor={ 1.17 }
                        position={ [ 0, 1.56, - 1.4 ] }
                        rotation-x={ - 0.256 }
                    >
                        <iframe src="https://www.artstation.com/hosseinmousaviuk/" />
                    </Html>
                </primitive>

                <Text
                    color={'#e6e6e6ff'}
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={ 1 }
                    position={ [ 2, 0.75, 0.75 ] }
                    rotation-y={ - 1.40 }
                    maxWidth={ 2 }
                >
                    TEST 
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ - 1.4 }
            opacity={ 0.2 }
            scale={ 4 }
            blur={ 2.4 }
        />

    </>
}