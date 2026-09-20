package ua.evminov.tactical

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                EvminovLandingScreen()
            }
        }
    }
}

enum class TacticalThemeMode(val title: String) {
    MILITARY("Олива"),
    DARK("Темна"),
    LIGHT("Світла"),
    NATIONAL("UA Прапор")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EvminovLandingScreen() {
    val context = LocalContext.current
    val snackbarHostState = remember { SnackbarHostState() }
    val coroutineScope = rememberCoroutineScope()
    var currentTheme by remember { mutableStateOf(TacticalThemeMode.MILITARY) }
    var showOrderDialog by remember { mutableStateOf(false) }
    var plateWeight by remember { mutableStateOf(16f) }

    val themeColors = when (currentTheme) {
        TacticalThemeMode.MILITARY -> TacticalColors.Olive
        TacticalThemeMode.DARK -> TacticalColors.Dark
        TacticalThemeMode.LIGHT -> TacticalColors.Light
        TacticalThemeMode.NATIONAL -> TacticalColors.National
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "РПС ЄВМІНОВА",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = themeColors.onPrimary
                        )
                        Text(
                            text = "Тактичне розвантаження хребта",
                            fontSize = 12.sp,
                            color = themeColors.onPrimary.copy(alpha = 0.8f)
                        )
                    }
                },
                actions = {
                    Row(
                        modifier = Modifier.padding(end = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        TacticalThemeMode.values().forEach { theme ->
                            FilterChip(
                                selected = currentTheme == theme,
                                onClick = { currentTheme = theme },
                                label = { Text(theme.title, fontSize = 11.sp) },
                                modifier = Modifier.padding(horizontal = 2.dp)
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = themeColors.primaryContainer,
                    titleContentColor = themeColors.onPrimaryContainer
                )
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = {
                    val intent = Intent(Intent.ACTION_DIAL).apply {
                        data = Uri.parse("tel:+380442707009")
                    }
                    try {
                        context.startActivity(intent)
                    } catch (e: Exception) {
                        coroutineScope.launch {
                            snackbarHostState.showSnackbar("Гаряча лінія: +38 (044) 270-70-09")
                        }
                    }
                },
                icon = { Icon(Icons.Default.Phone, contentDescription = "Call") },
                text = { Text("Зателефонувати") },
                containerColor = themeColors.primary,
                contentColor = themeColors.onPrimary
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(themeColors.background)
                .padding(paddingValues)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(8.dp))
                HeroHeaderCard(
                    themeColors = themeColors,
                    onOrderClick = { showOrderDialog = true },
                    onResearchClick = {
                        coroutineScope.launch {
                            snackbarHostState.showSnackbar(
                                message = "Дослідження ТОВ «НВЦ Дніпро 24» підтверджує 100% розвантаження!",
                                actionLabel = "Зрозуміло"
                            )
                        }
                    }
                )
            }

            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = themeColors.surface),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "Біомеханічний калькулятор розвантаження",
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp,
                            color = themeColors.onSurface
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Вага бронежилета та БК: ${plateWeight.toInt()} кг",
                            fontSize = 14.sp,
                            color = themeColors.primary,
                            fontWeight = FontWeight.SemiBold
                        )
                        Slider(
                            value = plateWeight,
                            onValueChange = { plateWeight = it },
                            valueRange = 8f..32f,
                            steps = 11
                        )
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text("Звичайна плитоноска:", fontSize = 12.sp, color = themeColors.onSurface.copy(alpha = 0.7f))
                                Text("${plateWeight.toInt()} кг на плечах", fontWeight = FontWeight.Bold, color = Color(0xFFE53935))
                            }
                            Column(horizontalAlignment = Alignment.End) {
                                Text("З РПС Євмінова:", fontSize = 12.sp, color = themeColors.onSurface.copy(alpha = 0.7f))
                                Text("0 кг на плечах (100% на таз)", fontWeight = FontWeight.Bold, color = Color(0xFF43A047))
                            }
                        }
                    }
                }
            }

            item {
                StatsRow(themeColors = themeColors)
            }

            item {
                Text(
                    text = "Ключові переваги системи",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = themeColors.onBackground
                )
            }

            items(CoreAdvantages) { advantage ->
                AdvantageCard(advantage = advantage, themeColors = themeColors)
            }

            item {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Порівняльний аналіз систем",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = themeColors.onBackground
                )
                Text(
                    text = "Згідно з дослідженням ТОВ «НВЦ «ДНІПРО 24»",
                    fontSize = 13.sp,
                    color = themeColors.onBackground.copy(alpha = 0.7f)
                )
            }

            items(ComparisonList) { item ->
                ComparisonCard(item = item, themeColors = themeColors)
            }

            item {
                Text(
                    text = "Штатна комплектація (9 вузлів)",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = themeColors.onBackground
                )
            }

            items(KitElements) { kit ->
                KitItemRow(kit = kit, themeColors = themeColors)
            }

            item {
                MedicalEndorsementCard(
                    doctorName = "Поліщук Микола Єфремович",
                    doctorTitle = "д.мед.н., професор, нейрохірург, екс-Міністр охорони здоровя України",
                    quote = "Система РПС Євмінова — це стратегічний інструмент збереження здоровя та боєздатності захисників України.",
                    themeColors = themeColors
                )
            }

            item {
                CtaBannerCard(
                    themeColors = themeColors,
                    onOrderClick = { showOrderDialog = true }
                )
                Spacer(modifier = Modifier.height(72.dp))
            }
        }
    }

    if (showOrderDialog) {
        OrderDialog(
            onDismiss = { showOrderDialog = false },
            onConfirm = {
                showOrderDialog = false
                coroutineScope.launch {
                    snackbarHostState.showSnackbar("Запит надіслано!")
                }
            }
        )
    }
}

@Composable
fun HeroHeaderCard(themeColors: ColorSchemeState, onOrderClick: () -> Unit, onResearchClick: () -> Unit) {
    Card(
        colors = CardDefaults.cardColors(containerColor = themeColors.surface),
        shape = RoundedCornerShape(16.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(imageVector = Icons.Default.Security, contentDescription = null, tint = themeColors.primary, modifier = Modifier.size(28.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("ПАТЕНТОВАНА СИСТЕМА РПС-М", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = themeColors.primary)
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text("100% перенесення навантаження з плечей на таз", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, color = themeColors.onSurface)
            Spacer(modifier = Modifier.height(10.dp))
            Text("Зберігає хребет, відновлює дихання та знижує втому вдвічі.", fontSize = 14.sp, color = themeColors.onSurface.copy(alpha = 0.8f))
            Spacer(modifier = Modifier.height(16.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = onOrderClick, colors = ButtonDefaults.buttonColors(containerColor = themeColors.primary), modifier = Modifier.weight(1f)) {
                    Text("Замовити", fontWeight = FontWeight.Bold)
                }
                OutlinedButton(onClick = onResearchClick, modifier = Modifier.weight(1f)) {
                    Text("Дослідження")
                }
            }
        }
    }
}

@Composable
fun StatsRow(themeColors: ColorSchemeState) {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        StatItem("100%", "Розвантаження плечей", Modifier.weight(1f), themeColors)
        StatItem("360°", "Рухливість шарніра", Modifier.weight(1f), themeColors)
        StatItem("У 2 рази", "Менше втоми", Modifier.weight(1f), themeColors)
    }
}

@Composable
fun StatItem(title: String, subtitle: String, modifier: Modifier, themeColors: ColorSchemeState) {
    Card(colors = CardDefaults.cardColors(containerColor = themeColors.surface), shape = RoundedCornerShape(12.dp), modifier = modifier) {
        Column(modifier = Modifier.padding(12.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = title, fontWeight = FontWeight.Black, fontSize = 18.sp, color = themeColors.primary)
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = subtitle, fontSize = 11.sp, textAlign = TextAlign.Center, color = themeColors.onSurface.copy(alpha = 0.8f))
        }
    }
}

@Composable
fun AdvantageCard(advantage: Advantage, themeColors: ColorSchemeState) {
    Card(colors = CardDefaults.cardColors(containerColor = themeColors.surface), shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()) {
        Row(modifier = Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(modifier = Modifier.size(44.dp).clip(CircleShape).background(themeColors.primaryContainer), contentAlignment = Alignment.Center) {
                Icon(imageVector = advantage.icon, contentDescription = null, tint = themeColors.onPrimaryContainer)
            }
            Spacer(modifier = Modifier.width(14.dp))
            Column {
                Text(text = advantage.title, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = themeColors.onSurface)
                Spacer(modifier = Modifier.height(2.dp))
                Text(text = advantage.desc, fontSize = 13.sp, color = themeColors.onSurface.copy(alpha = 0.75f))
            }
        }
    }
}

@Composable
fun ComparisonCard(item: ComparisonModel, themeColors: ColorSchemeState) {
    Card(
        colors = CardDefaults.cardColors(containerColor = if (item.isWinner) themeColors.primaryContainer.copy(alpha = 0.4f) else themeColors.surface),
        border = if (item.isWinner) androidx.compose.foundation.BorderStroke(1.5.dp, themeColors.primary) else null,
        shape = RoundedCornerShape(12.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Text(text = item.name, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = themeColors.onSurface)
                Badge(containerColor = if (item.isWinner) Color(0xFF2E7D32) else Color.Gray) {
                    Text(text = item.status, color = Color.White, fontSize = 11.sp, modifier = Modifier.padding(horizontal = 4.dp))
                }
            }
            Spacer(modifier = Modifier.height(6.dp))
            Text(text = item.verdict, fontSize = 13.sp, color = themeColors.onSurface.copy(alpha = 0.85f))
        }
    }
}

@Composable
fun KitItemRow(kit: KitElement, themeColors: ColorSchemeState) {
    Card(colors = CardDefaults.cardColors(containerColor = themeColors.surface), shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth()) {
        Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(modifier = Modifier.size(28.dp).clip(CircleShape).background(themeColors.primary), contentAlignment = Alignment.Center) {
                Text(text = kit.index.toString(), color = themeColors.onPrimary, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column {
                Text(text = kit.title, fontWeight = FontWeight.SemiBold, fontSize = 14.sp, color = themeColors.onSurface)
                Text(text = kit.description, fontSize = 12.sp, color = themeColors.onSurface.copy(alpha = 0.7f))
            }
        }
    }
}

@Composable
fun MedicalEndorsementCard(doctorName: String, doctorTitle: String, quote: String, themeColors: ColorSchemeState) {
    Card(colors = CardDefaults.cardColors(containerColor = themeColors.surface), shape = RoundedCornerShape(14.dp), modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Verified, contentDescription = null, tint = Color(0xFF1976D2))
                Spacer(modifier = Modifier.width(6.dp))
                Text("Медичний висновок", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = themeColors.onSurface)
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = quote, fontSize = 13.sp, fontStyle = androidx.compose.ui.text.font.FontStyle.Italic, color = themeColors.onSurface.copy(alpha = 0.9f))
            Spacer(modifier = Modifier.height(10.dp))
            Text(text = doctorName, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = themeColors.primary)
            Text(text = doctorTitle, fontSize = 11.sp, color = themeColors.onSurface.copy(alpha = 0.65f))
        }
    }
}

@Composable
fun CtaBannerCard(themeColors: ColorSchemeState, onOrderClick: () -> Unit) {
    Card(colors = CardDefaults.cardColors(containerColor = themeColors.primary), shape = RoundedCornerShape(16.dp), modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(text = "Збережіть спину воїна", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = themeColors.onPrimary, textAlign = TextAlign.Center)
            Spacer(modifier = Modifier.height(6.dp))
            Text(text = "Умови для підрозділів ЗСУ, НГУ, ТрО та волонтерів.", fontSize = 13.sp, color = themeColors.onPrimary.copy(alpha = 0.85f), textAlign = TextAlign.Center)
            Spacer(modifier = Modifier.height(14.dp))
            Button(onClick = onOrderClick, colors = ButtonDefaults.buttonColors(containerColor = themeColors.onPrimary, contentColor = themeColors.primary)) {
                Text("Оформити замовлення", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun OrderDialog(onDismiss: () -> Unit, onConfirm: () -> Unit) {
    var callsign by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var quantity by remember { mutableStateOf("1") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Запит на РПС Євмінова") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(value = callsign, onValueChange = { callsign = it }, label = { Text("Позивний / ПІБ") }, singleLine = true, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = phone, onValueChange = { phone = it }, label = { Text("Телефон (+380...)") }, singleLine = true, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = quantity, onValueChange = { quantity = it }, label = { Text("Кількість комплектів") }, singleLine = true, modifier = Modifier.fillMaxWidth())
            }
        },
        confirmButton = { Button(onClick = onConfirm) { Text("Надіслати") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Скасувати") } }
    )
}

data class Advantage(val title: String, val desc: String, val icon: ImageVector)
data class ComparisonModel(val name: String, val status: String, val verdict: String, val isWinner: Boolean)
data class KitElement(val index: Int, val title: String, val description: String)

val CoreAdvantages = listOf(
    Advantage("100% Зняття з плечей", "Вага бронежилету переноситься на тазове кільце", Icons.Default.Shield),
    Advantage("Свобода рухів 360°", "Рухомий шарнір не обмежує нахили та повороти", Icons.Default.Sync),
    Advantage("Вдвічі менше втоми", "Зниження втоми, відновлення дихання", Icons.Default.Favorite),
    Advantage("Сумісність 100%", "Підходить до будь-яких плитоносок ЗСУ", Icons.Default.CheckCircle)
)

val ComparisonList = listOf(
    ComparisonModel("РПС ЄВМІНОВА (РПС-М)", "Переможець випробувань", "100% розвантаження, 360° мобільність, швидкоскид", true),
    ComparisonModel("Next Gen Armor", "Частковий захист", "Низька зносостійкість, сковує повороти", false),
    ComparisonModel("Marom Dolphin (Ізраїль)", "Лише задня плита", "Знімає вагу тільки задньої плити", false),
    ComparisonModel("Crye Precision AVS StKSS", "Закрита система", "Блокує бічні нахили, без швидкоскиду", false)
)

val KitElements = listOf(
    KitElement(1, "Сумка транспортувальна", "Зносостійка міцна Cordura"),
    KitElement(2, "Плечові планки в чохлах", "Розподіл тиску на плечах"),
    KitElement(3, "Анатомічний корсет", "Велкро-панель та підтримка лордозу"),
    KitElement(4, "Короб для хвостовика", "Ударостійкий корпус"),
    KitElement(5, "Хвостовик із фастексом", "Вертикальна передавальна ланка"),
    KitElement(6, "Несуча напрямна (рейка)", "Рухомий кукумбер для поворотів 360°"),
    KitElement(7, "Шарнір із фастексом", "Вже змонтований та налаштований"),
    KitElement(8, "Пояс збільшеної площі", "Можливість балістичного пакета"),
    KitElement(9, "Кліпси кріплення (пара)", "Регулювання під будь-який зріст")
)

object TacticalColors {
    val Olive = ColorSchemeState(
        primary = Color(0xFF4B5320), primaryContainer = Color(0xFF3B441B), onPrimary = Color.White, onPrimaryContainer = Color(0xFFE2E7C4),
        background = Color(0xFF1B1F17), onBackground = Color(0xFFE4E6DF), surface = Color(0xFF262C21), onSurface = Color(0xFFECEFE7)
    )
    val Dark = ColorSchemeState(
        primary = Color(0xFFD0BCFF), primaryContainer = Color(0xFF4F378B), onPrimary = Color(0xFF381E72), onPrimaryContainer = Color(0xFFEADDFF),
        background = Color(0xFF141218), onBackground = Color(0xFFE6E0E9), surface = Color(0xFF211F26), onSurface = Color(0xFFE6E0E9)
    )
    val Light = ColorSchemeState(
        primary = Color(0xFF344E41), primaryContainer = Color(0xFFDAD7CD), onPrimary = Color.White, onPrimaryContainer = Color(0xFF1F2923),
        background = Color(0xFFF7F8F6), onBackground = Color(0xFF1F2421), surface = Color(0xFFFFFFFF), onSurface = Color(0xFF1F2421)
    )
    val National = ColorSchemeState(
        primary = Color(0xFF0057B7), primaryContainer = Color(0xFF003875), onPrimary = Color(0xFFFFDD00), onPrimaryContainer = Color(0xFFFFDD00),
        background = Color(0xFF0E1A29), onBackground = Color(0xFFF0F4F8), surface = Color(0xFF17283E), onSurface = Color(0xFFF0F4F8)
    )
}

data class ColorSchemeState(
    val primary: Color, val primaryContainer: Color, val onPrimary: Color, val onPrimaryContainer: Color,
    val background: Color, val onBackground: Color, val surface: Color, val onSurface: Color
)